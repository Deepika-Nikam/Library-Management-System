const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Your database connection

router.get('/logs', async (req, res) => {
    try {
        const result = await pool.query(`
SELECT t.id, 
u.username as user_name, 
b.book_name as book_name, 
t.issue_date, 
t.status, 
t.return_date
            FROM transactions t
            JOIN users u ON t.user_id = u.id
            JOIN books b ON t.book_id = b.id
            ORDER BY t.issue_date DESC;
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;