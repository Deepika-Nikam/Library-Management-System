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

    // backend/routes/userRoutes.js (inside your login function)

try {
    const { email, password } = req.body;
    
    // 1. Fetch user from DB
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    // 2. Check if user exists
    if (!user) {
        return res.status(401).json({ error: "User not found" });
    }

    // ... (Your password comparison logic here) ...

    // 3. Generate Token
    const token = jwt.sign(
        { id: user.id, role: user.role }, 
        process.env.JWT_SECRET || 'fallback_secret' // Added fallback to prevent crash
    );

    // 4. Send Response
    // We use a console.log here so YOU can see it in the backend terminal
    console.log(`User ${email} logged in with role: ${user.role}`);

    res.json({
        token,
        role: user.role, // Ensure this matches your DB column name exactly!
        name: user.name
    });

} catch (err) {
    console.error("SERVER ERROR:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
}
};