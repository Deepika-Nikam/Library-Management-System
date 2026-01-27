// backend/src/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/issue', verifyToken, transactionController.issueBook);
router.get('/my-loans', verifyToken, transactionController.getUserLoans);
router.post('/return', verifyToken, transactionController.returnBook);
// router.get('/logs', verifyToken, transactionController.getAllTransactions);

module.exports = router;