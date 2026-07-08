const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database');

const JWT_SECRET = process.env.JWT_SECRET || 'veloura_super_secret_key_dev';

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// POST /api/user/onboarding
router.post('/onboarding', authenticateToken, (req, res) => {
    const { height, weight, skinTone, bodyShape } = req.body;
    const userId = req.user.userId;

    // TODO: if selfie is uploaded, process it or store it here.
    // A real system would use a cloud storage URL and maybe kick off a skin-tone detection AI job.

    const stmt = db.prepare(`UPDATE Users SET height = ?, weight = ?, skinTone = ?, bodyShape = ? WHERE id = ?`);
    stmt.run([height, weight, skinTone, bodyShape, userId], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Onboarding completed successfully' });
    });
});

// GET /api/user/profile
router.get('/profile', authenticateToken, (req, res) => {
    const userId = req.user.userId;
    db.get(`SELECT id, contact, height, weight, skinTone, bodyShape FROM Users WHERE id = ?`, [userId], (err, user) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    });
});

module.exports = router;
