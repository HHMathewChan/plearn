const database = require('../database');

/** 
 * Get the topic_id for a given course_id
 * @param {string} courseId - The ID of the course
 * @returns {Promise<string|null>} - The topic_id associated with the course, or null if not found
 */
async function getTopicIdByCourseId(courseId) {
    // for debugging
    console.log('At labelCourseWithRepository, getTopicIdByCourseId, Fetching topic ID for course:', courseId);
    const result = await database.any(
        'SELECT topic_id FROM labelcoursewith WHERE course_id = $1',
        [courseId]
    );
    // for debugging
    console.log('At labelCourseWithRepository, getTopicIdByCourseId, Fetched topic ID for course:', result);
    return result.length > 0 ? result[0].topic_id : null;
}

module.exports = {
  getTopicIdByCourseId,
};
