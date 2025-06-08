require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const database = require('./database');

const app = express();
const router = express.Router();

// Middleware
app.use(cors());
app.use(express.json());
app.use(router);

const port = process.env.PORT || 3001;

/** Endpoint to get all students
 * This endpoint retrieves all students from the database
 * and returns them as a JSON response.
 * If an error occurs, it returns a 500 status with the error message.
 */
router.get('/api/students', async (request, response, next) => {
  try {
    const students = await database.any('SELECT * FROM student');
    response.json(students);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// Endpoint to validate loin credentials, assuming a simple email and password check
router.post('/api/validate', async (request, response) => {
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
  } catch (error) {
    console.error('Error during login:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
});


// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

