require('dotenv').config();
const express = require('express');
const cors = require('cors');
const platformUserRoutes = require('./routes/platformUserRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrolmentRoutes = require('./routes/enrolmentRoutes');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/platform-user-routes', platformUserRoutes);
app.use('/api/course-routes', courseRoutes);
app.use('/api/enrolment-routes', enrolmentRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});