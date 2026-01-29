import db from "../config/db.js";

exports.addBook = async (req, res) => {
    const { book_name, author, category, count } = req.body;
    try {
        const newBook = await db.query(
            'INSERT INTO Books (book_name, author, category, count, available_count) VALUES ($1, $2, $3, $4, $4) RETURNING *',
            [book_name, author, category, count]
        );
        res.status(201).json({ book: newBook.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getAllBooks = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Books');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

