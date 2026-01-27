// backend/src/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Import Routes (You'll create these files next)
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Use Routes
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/admin', adminRoutes);

// Basic Health Check
app.get('/', (req, res) => {
    res.send('Library Management System API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is roaring on port ${PORT}`);
});