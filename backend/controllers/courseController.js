/**
 * This file is to manage course operations.
 * It includes functions to get all courses metadata.
 */
const courseService = require('../services/courseService');

/**
 * handlers for the getAllCoursesMetadata function
 * This function retrieves all courses metadata, including course details and copyright owner information.
 * @async
 * @function getAllCoursesMetadata
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void} Sends JSON response with courses data or error
 * @throws {Error} Throws an error if there's an issue fetching courses or copyright owner data.
 */
const getAllCoursesMetadata = async (req, res, next) => {
    try {
        const courses = await courseService.getAllCoursesMetadata();
        res.json({ courses });
    } catch (error) {
        console.error('CourseController error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: `Error fetching courses metadata: ${error.message}`
        });
    }
};

module.exports = {
    getAllCoursesMetadata
};