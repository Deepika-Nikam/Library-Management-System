const express = require('express');
const router = express.Router();
const db = require("../config/db");

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
                (SELECT COUNT(*) FROM transactions WHERE LOWER(status) = 'issued') as active_loans,
                (SELECT COUNT(*) FROM users WHERE role = 'student') as total_students
        `);
        res.json(stats.rows[0]);
    } catch (err) {
        console.error("Stats Error:", err.message);
        res.status(500).send("Server Error");
    }
});

router.put('/return/:transactionId', async (req, res) => {
    const client = await db.connect(); 
    try {
        await client.query('BEGIN'); 

        const { transactionId } = req.params;

        const updateResult = await client.query(
            'UPDATE transactions SET status = $1, return_date = NOW() WHERE id = $2 RETURNING book_id',
            ['Returned', transactionId]
        );

        if (updateResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: "Transaction not found" });
        }


        const bookId = updateResult.rows[0].book_id;
        await client.query(
            'UPDATE books SET available_count = available_count + 1 WHERE id = $1',
            [bookId]
        );

        await client.query('COMMIT'); 
        res.json({ message: "Book returned successfully" });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error("Return Error:", err.message);
        res.status(500).json({ error: "Return process failed" });
    } finally {
        client.release(); 
    }
});

router.post('/add-book', async (req, res) => {

    const { book_name, author, isbn, count } = req.body; 
    try {
        await db.query(
            'INSERT INTO books (book_name, author, isbn, count, available_count) VALUES ($1, $2, $3, $4, $5)',
            [book_name, author, isbn, count, count] 
        );
        res.json({ message: "Book added!" });
    } catch (err) {
        console.error("Add Book Error:", err.message);
        res.status(500).send("Server Error");
    }
});

router.put('/update-book/:id', async (req, res) => {
    const { available_copies } = req.body;
    try {
        await db.query(
            'UPDATE books SET count = $1, available_count = $1 WHERE id = $2', 
            [available_copies, req.params.id]
        );
        res.json({ message: "Stock updated across system" });
    } catch (err) { 
        res.status(500).send("Server Error"); 
    }
});

router.delete('/delete-book/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM books WHERE id = $1', [req.params.id]);
        res.json({ message: "Book deleted" });
    } catch (err) {
        
        res.status(400).json({ error: "Cannot delete book while it is issued to students." });
    }
});



module.exports = router;