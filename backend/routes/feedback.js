const express = require('express');
const router = express.Router();
const db = require('../database');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'veloura_super_secret_key_dev';

// Optional middleware to get user if token is provided, but allow anonymous feedback too
const optionalAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (!err) {
                req.user = user;
            }
            next();
        });
    } else {
        next();
    }
};

// POST /api/feedback
router.post('/', optionalAuth, (req, res) => {
    const { productId, rating, comment } = req.body;
    const userId = req.user ? req.user.userId : null;

    if (!rating) {
        return res.status(400).json({ error: 'Rating is required' });
    }

    const stmt = db.prepare(`INSERT INTO Feedback (userId, productId, rating, comment) VALUES (?, ?, ?, ?)`);
    stmt.run([userId, productId || null, rating, comment || null], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Feedback submitted successfully', feedbackId: this.lastID });
    });
});

module.exports = router;
