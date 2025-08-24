require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const platformUserRoutes = require('./routes/platformUserRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrolmentRoutes = require('./routes/enrolmentRoutes');
const studentRoutes = require('./routes/studentRoutes');
const courseContentRoutes = require('./routes/courseContentRoutes');
const contentProgressRoutes = require('./routes/contentProgressRoutes');
const finalQuizRoutes = require('./routes/finalQuizRoutes');
const quizAttemptRoutes = require('./routes/quizAttemptRoutes');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/platform-user-routes', platformUserRoutes);
app.use('/api/course-routes', courseRoutes);
app.use('/api/enrolment-routes', enrolmentRoutes);
app.use('/api/student-routes', studentRoutes);
app.use('/api/course-content-routes', courseContentRoutes);
app.use('/api/content-progress-routes', contentProgressRoutes);
app.use('/api/final-quiz-routes', finalQuizRoutes);
app.use('/api/quiz-attempt-routes', quizAttemptRoutes);

// Serve course resources statically
app.use('/course-resources', express.static(path.join(__dirname, 'courseResources')));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});