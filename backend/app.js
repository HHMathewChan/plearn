const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const db = require('./db'); // Import the db instance from db.js

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

/** Endpoint to get all students
 * This endpoint retrieves all students from the database
 * and returns them as a JSON response.
 * If an error occurs, it returns a 500 status with the error message.
 */
app.get('/api/students', async (request, response) => {
  try {
    const students = await db.any('SELECT * FROM student');
    response.json(students);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

