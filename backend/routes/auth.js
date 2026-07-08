const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database');

const JWT_SECRET = process.env.JWT_SECRET || 'veloura_super_secret_key_dev';

// POST /api/auth/send-otp
router.post('/send-otp', (req, res) => {
    const { contact } = req.body;
    if (!contact) {
        return res.status(400).json({ error: 'Contact (mobile/email) is required' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    // TODO: Integrate real SMS provider (Firebase/MSG91/Twilio) here
    console.log(`[MOCK OTP SERVICE] Sending OTP ${otp} to ${contact}`);

    // Save to DB
    const stmt = db.prepare(`INSERT INTO Otps (contact, otp, expiresAt) VALUES (?, ?, ?)`);
    stmt.run([contact, otp, expiresAt.toISOString()], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'OTP sent successfully', mockOtp: otp }); // Returning OTP for easy dev testing
    });
});

// POST /api/auth/verify-otp
router.post('/verify-otp', (req, res) => {
    const { contact, otp } = req.body;
    if (!contact || !otp) {
        return res.status(400).json({ error: 'Contact and OTP are required' });
    }

    db.get(`SELECT * FROM Otps WHERE contact = ? ORDER BY id DESC LIMIT 1`, [contact], (err, row) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        
        if (!row) return res.status(400).json({ error: 'No OTP found for this contact' });

        // Check expiry
        const now = new Date();
        const expiresAt = new Date(row.expiresAt);
        if (now > expiresAt) {
            return res.status(400).json({ error: 'OTP has expired' });
        }

        if (row.otp !== otp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        // OTP valid, check if user exists
        db.get(`SELECT * FROM Users WHERE contact = ?`, [contact], (err, user) => {
            if (err) return res.status(500).json({ error: 'Database error' });

            if (user) {
                // Existing user
                const token = jwt.sign({ userId: user.id, contact: user.contact }, JWT_SECRET, { expiresIn: '7d' });
                res.json({ message: 'Login successful', isNewUser: false, token, user });
            } else {
                // New user
                db.run(`INSERT INTO Users (contact) VALUES (?)`, [contact], function(err) {
                    if (err) return res.status(500).json({ error: 'Database error' });
                    const userId = this.lastID;
                    const token = jwt.sign({ userId, contact }, JWT_SECRET, { expiresIn: '7d' });
                    res.json({ message: 'Registration successful', isNewUser: true, token, user: { id: userId, contact } });
                });
            }
        });
    });
});

module.exports = router;
