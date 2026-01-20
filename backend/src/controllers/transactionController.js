// backend/src/controllers/transactionController.js
const db = require('../config/db');

exports.issueBook = async (req, res) => {
    const { bookId } = req.body;
    const userId = req.user.id; // From the verifyToken middleware

    try {
        await db.query('BEGIN'); // Start Transaction

        // 1. Check if book exists and is available
        const bookRes = await db.query('SELECT available_count FROM Books WHERE id = $1', [bookId]);
        if (bookRes.rows.length === 0 || bookRes.rows[0].available_count <= 0) {
            throw new Error('Book is out of stock!');
        }

        // 2. Insert into Transactions
        await db.query(
            'INSERT INTO Transactions (book_id, user_id, status) VALUES ($1, $2, $3)',
            [bookId, userId, 'issued']
        );

        // 3. Update Books table
        await db.query(
            'UPDATE Books SET available_count = available_count - 1 WHERE id = $1',
            [bookId]
        );

        await db.query('COMMIT'); // Save changes
        res.status(200).json({ message: "Book issued successfully" });
    } catch (err) {
        await db.query('ROLLBACK'); // Undo everything if error occurs
        res.status(400).json({ error: err.message });
    }
};

// Get books borrowed by the logged-in user
exports.getUserLoans = async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await db.query(
            `SELECT t.id, b.book_name, b.author, t.issue_date 
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

// backend/src/controllers/transactionController.js
exports.issueBook = async (req, res) => {
    const { bookId } = req.body; // Check if this matches your frontend { bookId: ... }
    const userId = req.user.id;   // This comes from the JWT token

    try {
        await db.query('BEGIN');
        
        // 1. Check stock
        const book = await db.query('SELECT available_count FROM Books WHERE id = $1', [bookId]);
        
        if (book.rows.length === 0 || book.rows[0].available_count <= 0) {
            throw new Error("Book is not available");
        }

        // 2. Insert Transaction record
        await db.query('INSERT INTO Transactions (book_id, user_id, status) VALUES ($1, $2, $3)', [bookId, userId, 'issued']);

        // 3. Update Book Count
        await db.query('UPDATE Books SET available_count = available_count - 1 WHERE id = $1', [bookId]);

        await db.query('COMMIT');
        res.json({ message: "Success!" });
    } catch (err) {
        await db.query('ROLLBACK');
        res.status(400).json({ error: err.message });
    }
};