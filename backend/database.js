const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // Create tables
        db.run(`CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            contact TEXT UNIQUE,
            password TEXT,
            height TEXT,
            weight TEXT,
            skinTone TEXT,
            bodyShape TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, () => {
            // Migration: Add password column to existing databases
            db.run(`ALTER TABLE Users ADD COLUMN password TEXT`, (err) => {
                if (!err) console.log('Added password column to Users table');
            });
            // Migration: Add name column
            db.run(`ALTER TABLE Users ADD COLUMN name TEXT`, (err) => {
                if (!err) console.log('Added name column to Users table');
            });
        });

        db.run(`CREATE TABLE IF NOT EXISTS Otps (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            contact TEXT,
            otp TEXT,
            expiresAt DATETIME,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS Feedback (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            productId INTEGER,
            rating INTEGER,
            comment TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

module.exports = db;
