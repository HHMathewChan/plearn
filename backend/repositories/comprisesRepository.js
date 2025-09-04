const database = require('../database');

/**
 * Get all course contentIDs by course content ID.
 * @param {string} courseContentId - The unique identifier for the course content.
 * @returns {Promise<Array>} - An array of course contentIDs.
 */
async function getAllCourseContentIDs(courseContentId) {
    // for debugging
    console.log("At comprisesRepository, getAllCourseContentIDs:", courseContentId);
    // first get the link
    const link = await database.oneOrNone(
        `SELECT * 
        FROM comprises 
        WHERE course_content_id = $1 `,
        [courseContentId]
    );
    // for debugging
    console.log("At comprisesRepository, getAllCourseContentIDs, link:", link);
    if (!link) {
        throw new Error('Course not found');
    }
    const courseContents = await database.any(
        `SELECT course_content_id 
        FROM comprises 
        WHERE course_id = $1`,
        [link.course_id]
    );
    // for debugging
    console.log("At comprisesRepository, getAllCourseContentIDs, courseContents:", courseContents);
    const contentIDs = courseContents.map(row => row.course_content_id);
    return contentIDs;
}
module.exports = {
    getAllCourseContentIDs
};
