const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');


router.get('/', bookController.getAllBooks);
router.post('/add-book', verifyToken, isAdmin, bookController.addBook);

module.exports = router;

