/**
 * This repository handles the OwnCourseBy table.
 * It allows to get all courses owned by a specific copyright owner and vice versa.
 */
const database = require('../database');

/**
 * Retrieves the copyright owner ID for a specific course.
 * 
 * @async
 * @function getCopyrightOwnerByCourseId
 * @param {string} courseId - The unique identifier of the course
 * @returns {Promise<Object>} A promise that resolves to the copyright owner ID for the given course ID
 * @throws {Error} Throws an error if no copyright owner is found for the given course ID
 * @throws {Error} Throws an error if there's a database connection or query issue
 */
const getCopyrightOwnerByCourseId = async (courseId) => {
    try {
        // Query to get a copyright owner for a specific course using the course ID from the OwnCourseBy table
        const result = await database.query(
            'SELECT owncourseby.copyright_owner_id FROM owncourseby ' +
            'WHERE owncourseby.course_id = $1',
            [courseId]
        );
        
        console.log('Query result for course ID', courseId, ':', result);
        
        // With pg-promise, result is directly the array of rows
        if (result.length === 0) {
            throw new Error('No copyright owner found for the given course ID');
        }
        // Return the copyright owner ID
        return result[0].copyright_owner_id;
    }
    catch (error) {
        // Log the error and rethrow it
        console.error('Error fetching copyright owner by course ID:', error);
        throw error;
    }
};

module.exports = {
    getCopyrightOwnerByCourseId
};