const courseProgressService = require('../services/courseProgressService');

/**
 * Controller function to handle course progress creation
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createCourseProgressUseCase(req, res) {
    try {
        const { student_code, course_id } = req.body;

        // Validate input
        if (!student_code || !course_id) {
            return res.status(400).json({ error: 'Student code and course ID are required.' });
        }

        // Call the service layer use case
        const courseProgress = await courseProgressService.createCourseProgressUseCase(student_code, course_id);

        // Respond with the created course progress
        return res.status(201).json({
            message: 'Course progress created successfully.',
            data: courseProgress,
        });
    } catch (error) {
        console.error('Error creating course progress:', error);

        return res.status(500).json({ error: 'An error occurred while creating course progress.' });
    }
}

/**
 * Controller function to handle retrieving course progress
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Response contains the course progress data if successful
 */
async function getCourseProgressUseCase(req, res) {
    try {
        const { student_code, course_id } = req.body;
        // for debugging
        console.log(`At courseProgressController, Getting course progress for student ${student_code} in course ${course_id}`);

        // Validate input
        if (!student_code || !course_id) {
            return res.status(400).json({ error: 'Student code and course ID are required.' });
        }

        // Call the service layer use case
        const courseProgress = await courseProgressService.getCourseProgressUseCase(student_code, course_id);

        if (!courseProgress) {
            return res.status(404).json({ message: 'Course progress not found.' });
        }

        return res.status(200).json({
            message: 'Course progress retrieved successfully.',
            data: courseProgress,
        });
    } catch (error) {
        console.error('Error retrieving course progress:', error);
        return res.status(500).json({ error: 'An error occurred while retrieving course progress.' });
    }
}

/**
 * Controller function to call different use cases base on the action parameter
 */
async function CourseProgressController(req, res) {
    const { action } = req.body;

    switch (action) {
        case 'create':
            return createCourseProgressUseCase(req, res);
        case 'get':
            return getCourseProgressUseCase(req, res);
        default:
            return res.status(400).json({ error: 'Invalid action.' });
    }
}

module.exports = {
    CourseProgressController,
};