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

// Endpoint to validate loin credentials, assuming a simple email and password check
app.post('/api/validate', async (request, response) => {
  const { email, password } = request.body;
  console.log(`Login attempt with email: ${email}, password: ${password}`);
  try {
    // Here you would typically check the credentials against a database
    if (email === 'admin@gmail.com' && password === 'password') {
      console.log('Login successful');
      response.json({ token: 'test123' });
    } else {
      console.log('Invalid credentials');
      response.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    response.status(500).json({ error: 'Internal server error' });
  }
});


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

