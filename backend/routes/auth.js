const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database');

const JWT_SECRET = process.env.JWT_SECRET || 'veloura_super_secret_key_dev';

// POST /api/auth/check-user
// Checks if a user already exists with the given contact
router.post('/check-user', (req, res) => {
    const { contact } = req.body;
    if (!contact) return res.status(400).json({ error: 'Contact is required' });

    db.get(`SELECT id FROM Users WHERE contact = ?`, [contact], (err, row) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ exists: !!row });
    });
});

// POST /api/auth/send-otp
router.post('/send-otp', (req, res) => {
    const { contact } = req.body;
    if (!contact) return res.status(400).json({ error: 'Contact is required' });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    // TODO: Integrate real SMS provider here
    console.log(`[MOCK OTP SERVICE] Sending OTP ${otp} to ${contact}`);

    // Save to DB
    const stmt = db.prepare(`INSERT INTO Otps (contact, otp, expiresAt) VALUES (?, ?, ?)`);
    stmt.run([contact, otp, expiresAt.toISOString()], function(err) {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ message: 'OTP sent successfully', mockOtp: otp }); 
    });
});

// POST /api/auth/verify-otp
// Verifies OTP and directly logs in or registers user with optional password and name
router.post('/verify-otp', async (req, res) => {
    const { contact, otp, password, name } = req.body;
    if (!contact || !otp) return res.status(400).json({ error: 'Contact and OTP required' });

    db.get(`SELECT * FROM Otps WHERE contact = ? ORDER BY id DESC LIMIT 1`, [contact], async (err, row) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!row) return res.status(400).json({ error: 'No OTP found for this contact' });
        
        if (new Date() > new Date(row.expiresAt)) {
            return res.status(400).json({ error: 'OTP has expired' });
        }
        if (row.otp !== otp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        let hashedPassword = null;
        if (password) {
            try {
                const salt = await bcrypt.genSalt(10);
                hashedPassword = await bcrypt.hash(password, salt);
            } catch (hErr) {
                return res.status(500).json({ error: 'Failed to process password' });
            }
        }

        // Check if user exists
        db.get(`SELECT * FROM Users WHERE contact = ?`, [contact], (userErr, existingUser) => {
            if (userErr) return res.status(500).json({ error: 'Database error' });

            if (existingUser) {
                // Update password or name if provided
                let updateQuery = [];
                let updateParams = [];
                if (hashedPassword) {
                    updateQuery.push('password = ?');
                    updateParams.push(hashedPassword);
                }
                if (name) {
                    updateQuery.push('name = ?');
                    updateParams.push(name);
                }

                if (updateQuery.length > 0) {
                    updateParams.push(existingUser.id);
                    db.run(`UPDATE Users SET ${updateQuery.join(', ')} WHERE id = ?`, updateParams);
                }

                const token = jwt.sign({ userId: existingUser.id, contact: existingUser.contact }, JWT_SECRET, { expiresIn: '7d' });
                return res.json({ 
                    success: true, 
                    message: 'Login successful', 
                    token, 
                    user: { 
                        id: existingUser.id, 
                        contact: existingUser.contact, 
                        name: name || existingUser.name, 
                        skinTone: existingUser.skinTone, 
                        bodyShape: existingUser.bodyShape 
                    },
                    isNewUser: !existingUser.skinTone
                });
            } else {
                // Create user upon OTP verification with optional name and password
                db.run(
                    `INSERT INTO Users (contact, name, password) VALUES (?, ?, ?)`,
                    [contact, name || null, hashedPassword],
                    function(insertErr) {
                        if (insertErr) return res.status(500).json({ error: 'Database error creating user' });
                        const userId = this.lastID;
                        const token = jwt.sign({ userId, contact }, JWT_SECRET, { expiresIn: '7d' });
                        return res.json({ 
                            success: true, 
                            message: 'Registration successful', 
                            token, 
                            user: { id: userId, contact, name: name || null },
                            isNewUser: true
                        });
                    }
                );
            }
        });
    });
});

// POST /api/auth/register
// Creates a new user with contact and password (OTP must have been verified first)
router.post('/register', async (req, res) => {
    const { contact, otp, password, name } = req.body;
    if (!contact || !otp || !password) return res.status(400).json({ error: 'Missing required fields' });

    // Verify OTP again just to be secure before registration
    db.get(`SELECT * FROM Otps WHERE contact = ? ORDER BY id DESC LIMIT 1`, [contact], async (err, row) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!row || row.otp !== otp || new Date() > new Date(row.expiresAt)) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            db.run(`INSERT INTO Users (contact, name, password) VALUES (?, ?, ?)`, [contact, name || null, hashedPassword], function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(400).json({ error: 'User already exists. Please log in.' });
                    }
                    return res.status(500).json({ error: 'Database error during registration' });
                }
                const userId = this.lastID;
                const token = jwt.sign({ userId, contact }, JWT_SECRET, { expiresIn: '7d' });
                res.json({ message: 'Registration successful', token, user: { id: userId, contact, name: name || null }, isNewUser: true });
            });
        } catch (hashError) {
            res.status(500).json({ error: 'Error processing password' });
        }
    });
});

// POST /api/auth/login
// Logs in an existing user with contact and password
router.post('/login', (req, res) => {
    const { contact, password } = req.body;
    if (!contact || !password) return res.status(400).json({ error: 'Contact and password required' });

    db.get(`SELECT * FROM Users WHERE contact = ?`, [contact], async (err, user) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!user) return res.status(400).json({ error: 'User not found. Please sign up first.' });
        if (!user.password) return res.status(400).json({ error: 'This account was created without a password. Please sign in with OTP.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Incorrect password. Please check and try again.' });

        const token = jwt.sign({ userId: user.id, contact: user.contact }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ message: 'Login successful', token, user: { id: user.id, contact: user.contact, name: user.name, skinTone: user.skinTone, bodyShape: user.bodyShape } });
    });
});

// POST /api/auth/demo
// Instant Quick Guest / Demo Access
router.post('/demo', (req, res) => {
    const demoContact = 'demo@veloura.app';
    db.get(`SELECT * FROM Users WHERE contact = ?`, [demoContact], (err, existingUser) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        if (existingUser) {
            const token = jwt.sign({ userId: existingUser.id, contact: existingUser.contact }, JWT_SECRET, { expiresIn: '7d' });
            return res.json({
                success: true,
                message: 'Guest login successful',
                token,
                user: {
                    id: existingUser.id,
                    contact: existingUser.contact,
                    name: existingUser.name || 'Demo VIP Guest',
                    skinTone: existingUser.skinTone || 'Warm Olive',
                    bodyShape: existingUser.bodyShape || 'Hourglass',
                    height: existingUser.height || '170cm',
                    weight: existingUser.weight || '60kg'
                }
            });
        } else {
            db.run(
                `INSERT INTO Users (contact, name, height, weight, skinTone, bodyShape) VALUES (?, ?, ?, ?, ?, ?)`,
                [demoContact, 'Demo VIP Guest', '170cm', '60kg', 'Warm Olive', 'Hourglass'],
                function(insertErr) {
                    if (insertErr) return res.status(500).json({ error: 'Database error creating demo user' });
                    const userId = this.lastID;
                    const token = jwt.sign({ userId, contact: demoContact }, JWT_SECRET, { expiresIn: '7d' });
                    return res.json({
                        success: true,
                        message: 'Guest login created',
                        token,
                        user: {
                            id: userId,
                            contact: demoContact,
                            name: 'Demo VIP Guest',
                            skinTone: 'Warm Olive',
                            bodyShape: 'Hourglass',
                            height: '170cm',
                            weight: '60kg'
                        }
                    });
                }
            );
        }
    });
});

// POST /api/auth/google
// Continue with Google authentication flow
// TODO: Replace mock handler with Google OAuth2 Client (google-auth-library / Firebase Auth) verification
router.post('/google', (req, res) => {
    const googleEmail = req.body.email || 'alex.google@gmail.com';
    const googleName = req.body.name || 'Alex Morgan';

    db.get(`SELECT * FROM Users WHERE contact = ?`, [googleEmail], (err, existingUser) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        if (existingUser) {
            const token = jwt.sign({ userId: existingUser.id, contact: existingUser.contact }, JWT_SECRET, { expiresIn: '7d' });
            return res.json({
                success: true,
                message: 'Google login successful',
                token,
                user: {
                    id: existingUser.id,
                    contact: existingUser.contact,
                    name: existingUser.name || googleName,
                    skinTone: existingUser.skinTone || 'Dusty Rose',
                    bodyShape: existingUser.bodyShape || 'Athletic',
                    height: existingUser.height || '168cm',
                    weight: existingUser.weight || '58kg'
                },
                isNewUser: false
            });
        } else {
            db.run(
                `INSERT INTO Users (contact, name, skinTone, bodyShape) VALUES (?, ?, ?, ?)`,
                [googleEmail, googleName, 'Dusty Rose', 'Athletic'],
                function(insertErr) {
                    if (insertErr) return res.status(500).json({ error: 'Database error creating Google user' });
                    const userId = this.lastID;
                    const token = jwt.sign({ userId, contact: googleEmail }, JWT_SECRET, { expiresIn: '7d' });
                    return res.json({
                        success: true,
                        message: 'Google registration successful',
                        token,
                        user: {
                            id: userId,
                            contact: googleEmail,
                            name: googleName,
                            skinTone: 'Dusty Rose',
                            bodyShape: 'Athletic'
                        },
                        isNewUser: true
                    });
                }
            );
        }
    });
});

module.exports = router;
