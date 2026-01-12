const db = require('../config/db');

exports.addBook = async (req, res) => {
    const { book_name, author, category, count } = req.body;

    try {
        const newBook = await db.query(
            'INSERT INTO Books (book_name, author, category, count, available_count) VALUES ($1, $2, $3, $4, $4) RETURNING *',
            [book_name, author, category, count]
        );
        
        res.status(201).json({
            message: "Book added to catalog!",
            book: newBook.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error while adding book" });
    }
};