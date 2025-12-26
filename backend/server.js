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
const courseProgressRoutes = require('./routes/courseProgressRoutes.js');
const studentLearningPerferenceRoutes = require('./routes/studentLearningPerferenceRoutes');
const personaliseLearningRoutes = require('./routes/personaliseLearningRoutes');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173',
    "https://plearn.vercel.app",
    "https://plearn-seven.vercel.app",
    "https://plearn-mathew-chans-projects-9f00d025.vercel.app"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 200
}));
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
app.use('/api/course-progress-routes', courseProgressRoutes);
app.use('/api/student-learning-preference-routes', studentLearningPerferenceRoutes);
app.use('/api/personalise-learning-routes', personaliseLearningRoutes);

// Serve course resources statically
app.use('/course-resources', express.static(path.join(__dirname, 'courseResources')));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});