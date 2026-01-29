const { Pool } = require('pg');
require('dotenv').config();

// Using the variables you preferred
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Logic to check if the connection is successful
pool.on('connect', () => {
  console.log('Connected to the local PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// backend/src/config/db.js

module.exports = {
  query: (text, params) => pool.query(text, params),
  connect: () => pool.connect(), // Add this line!
};