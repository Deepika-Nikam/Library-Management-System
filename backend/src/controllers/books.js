const pool = require('../config/db');

exports.getBooks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addBook = async (req, res) => {
  const { title, author, category, total_copies } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO books (title, author, category, total_copies, available_copies) VALUES ($1, $2, $3, $4, $4) RETURNING *',
      [title, author, category, total_copies]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};