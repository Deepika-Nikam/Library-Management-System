const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
    const { username, email, password, role } = req.body; // role: 'admin' or 'student'

    try {
        // 1. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 2. Insert into DB
        const newUser = await db.query(
            'INSERT INTO Users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role',
            [username, email, hashedPassword, role || 'student']
        );

        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "User registration failed. Email might already exist." });
    }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find user by email
        const user = await db.query('SELECT * FROM Users WHERE email = $1', [email]);
        if (user.rows.length === 0) return res.status(404).json({ error: "User not found" });

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // 3. Create JWT
        const token = jwt.sign(
            { id: user.rows[0].id, role: user.rows[0].role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: { id: user.rows[0].id, username: user.rows[0].username, role: user.rows[0].role }
        });
    } catch (err) {
        res.status(500).json({ error: "Server error during login" });
    }
};