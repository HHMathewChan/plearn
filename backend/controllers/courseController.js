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
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 * @see {@link courseService.getAllCoursesMetadata}
 * @throws {Error} Throws an error if there's an issue fetching courses or copyright owner data.
 */
const getAllCoursesMetadata = async (request, response, next) => {
    try {
        const courses = await courseService.getAllCoursesMetadata();
        response.json({ courses });
    } catch (error) {
        console.error('CourseController error:', error);
        response.status(500).json({
            error: 'Internal server error',
            message: `Error fetching courses metadata: ${error.message}`
        });
    }
};

module.exports = {
    getAllCoursesMetadata
};