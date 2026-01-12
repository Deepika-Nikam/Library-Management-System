// backend/src/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 


const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');


app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Library Management System API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is roaring on port ${PORT}`);
});