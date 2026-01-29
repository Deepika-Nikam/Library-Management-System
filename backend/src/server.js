const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(helmet());  

const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('Library Management System API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is roaring on port ${PORT}`);
});