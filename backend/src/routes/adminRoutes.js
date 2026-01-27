const express = require('express');
const router = express.Router();
const db = require("../config/db"); // Your database connection

router.get('/logs', async (req, res) => {
    try {
        const result = await db.query(`
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

router.get('/stats', async (req, res) => {
    try {
        const stats = await db.query(`
            SELECT 
                (SELECT COUNT(*) FROM books) as total_books,
                (SELECT COUNT(*) FROM transactions WHERE status = 'Issued') as active_loans,
                (SELECT COUNT(*) FROM users WHERE role = 'student') as total_students
        `);
        res.json(stats.rows[0]);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// backend/routes/adminRoutes.js

router.put('/return/:transactionId', async (req, res) => {
    try {
        const { transactionId } = req.params;

        // 1. Check if transaction exists and is currently 'Issued'
        const checkTrans = await db.query(
            'SELECT * FROM transactions WHERE id = $1', 
            [transactionId]
        );

        if (checkTrans.rows.length === 0) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        // 2. Update the transaction to 'Returned'
        await db.query(
            'UPDATE transactions SET status = $1, return_date = NOW() WHERE id = $2',
            ['Returned', transactionId]
        );

        // 3. Increment the book availability back up
        const bookId = checkTrans.rows[0].book_id;
        await db.query(
            'UPDATE books SET available_count = available_count + 1 WHERE id = $1',
            [bookId]
        );

        res.json({ message: "Success! Book returned and inventory updated." });

    } catch (err) {
        console.error("DETAILED BACKEND ERROR:", err.message); // Look at your terminal for this!
        res.status(500).json({ error: "Database update failed", details: err.message });
    }
});

module.exports = router;