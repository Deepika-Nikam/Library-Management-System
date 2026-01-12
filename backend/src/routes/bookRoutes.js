const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Anyone can view books
router.get('/', bookController.getAllBooks);

// ONLY Admins can add books
router.post('/add', verifyToken, isAdmin, bookController.addBook);

module.exports = router;