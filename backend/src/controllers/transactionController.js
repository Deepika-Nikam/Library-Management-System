const db = require('../config/db');

exports.issueBook = async (req, res) => {
    const { bookId, userId } = req.body;

    try {
        await db.query('BEGIN'); // Start transaction

        // 1. Check availability
        const bookCheck = await db.query('SELECT available_count FROM Books WHERE id = $1', [bookId]);
        if (bookCheck.rows[0].available_count <= 0) {
            throw new Error('Book is currently unavailable');
        }

        // 2. Create transaction
        await db.query(
            'INSERT INTO Transactions (book_id, user_id) VALUES ($1, $2)',
            [bookId, userId]
        );

        // 3. Update book count
        await db.query(
            'UPDATE Books SET available_count = available_count - 1 WHERE id = $1',
            [bookId]
        );

        await db.query('COMMIT');
        res.status(201).json({ message: "Book issued successfully!" });
    } catch (err) {
        await db.query('ROLLBACK');
        res.status(400).json({ error: err.message });
    }
};