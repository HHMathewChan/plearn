/**
 * @fileoverview Course content repository for database operations
 */
const database = require('../database');

/**
 * @typedef {Object} CourseContent
 * @property {string} id - The unique identifier for the course content.
 * @property {string} course_id - The course ID this content belongs to.
 * @property {string} title - The title of the course content.
 * @property {string} content_type - The type of content (e.g., pdf, video, text).
 * @property {string} content_url - The URL or path to the content.
 */

/**
 * Get all course content for a specific course.
 * @function getCourseContentByCourseId
 * @param {string} courseId - The unique identifier for the course (UUID)
 * @returns {Promise<Array<CourseContent>>} A promise that resolves to an array of course content objects
 * @throws {Error} Throws an error if there's a database connection or query issue
 * @see {@link CourseContent}
 */
const getCourseContentByCourseId = async (courseId) => {
    try {
        console.log(`[getCourseContentByCourseId] Querying content for course ID: "${courseId}"`);
        
        // Use .any() since 0 or more course content items are expected
        const courseContent = await database.any(
            'SELECT * FROM coursecontent WHERE course_id = $1 ORDER BY title',
            [courseId]
        );
        
        console.log(`[getCourseContentByCourseId] Found ${courseContent.length} content item(s) for course: "${courseId}"`);
        return courseContent;
    } catch (error) {
        console.error(`[getCourseContentByCourseId] Error fetching content for course ID: "${courseId}"`);
        console.error(`[getCourseContentByCourseId] Full error details:`, error);
        throw new Error(`Error fetching course content: ${error.message}`);
    }
};

/**
 * Get a specific course content item by its ID.
 * @function getCourseContentById
 * @param {string} contentId - The unique identifier for the course content (UUID)
 * @returns {Promise<CourseContent>} A promise that resolves to the course content object
 * @throws {Error} Throws an error if no content is found with the given ID
 * @see {@link CourseContent}
 */
const getCourseContentById = async (contentId) => {
    try {
        console.log(`[getCourseContentById] Querying content with ID: "${contentId}"`);
        
        // Use .one() since exactly one content item is expected
        const content = await database.one(
            'SELECT * FROM coursecontent WHERE id = $1',
            [contentId]
        );
        
        console.log(`[getCourseContentById] Successfully found content:`, content);
        return content;
    } catch (error) {
        console.error(`[getCourseContentById] Error fetching content with ID: "${contentId}"`);
        
        if (error.message === 'No data returned from the query.') {
            console.error(`[getCourseContentById] No content found with ID: "${contentId}"`);
            throw new Error(`Course content not found with ID: ${contentId}`);
        }
        
        console.error(`[getCourseContentById] Full error details:`, error);
        throw new Error(`Error fetching course content: ${error.message}`);
    }
};

module.exports = {
    getCourseContentByCourseId,
    getCourseContentById
};