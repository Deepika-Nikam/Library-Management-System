const db = require('../config/db');

exports.issueBook = async (req, res) => {
    const { bookId } = req.body;
    const userId = req.user.id; 

    try {
        await db.query('BEGIN'); 

        const bookRes = await db.query('SELECT available_count FROM Books WHERE id = $1', [bookId]);
        if (bookRes.rows.length === 0 || bookRes.rows[0].available_count <= 0) {
            throw new Error('Book is out of stock!');
        }

        await db.query(
            'INSERT INTO Transactions (book_id, user_id, status) VALUES ($1, $2, $3)',
            [bookId, userId, 'issued']
        );

        await db.query(
            'UPDATE Books SET available_count = available_count - 1 WHERE id = $1',
            [bookId]
        );

        await db.query('COMMIT'); 
        res.status(200).json({ message: "Book issued successfully" });
    } catch (err) {
        await db.query('ROLLBACK'); 
        res.status(400).json({ error: err.message });
    }
};

exports.getUserLoans = async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await db.query(
            `SELECT t.id, t.book_id, b.book_name, t.issue_date 
FROM Transactions t 
JOIN Books b ON t.book_id = b.id 
WHERE t.user_id = $1 AND t.status = 'issued'`,
            [userId]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch loans" });
    }
};

exports.returnBook = async (req, res) => {
    const { transactionId, bookId } = req.body; 

    try {
        await db.query('BEGIN');

        await db.query(
            "UPDATE Transactions SET status = 'returned', return_date = CURRENT_TIMESTAMP WHERE id = $1",
            [transactionId]
        );

        await db.query(
            'UPDATE Books SET available_count = available_count + 1 WHERE id = $1',
            [bookId]
        );

        await db.query('COMMIT');
        res.json({ message: "Book returned and stock updated!" });
    } catch (err) {
        await db.query('ROLLBACK');
        console.error("Return Transaction Error:", err);
        res.status(500).json({ error: "Return failed" });
    }
};