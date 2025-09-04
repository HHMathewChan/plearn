const database = require('../database');
/**
 * Find the final quiz id for a given course.
 *@param {string} courseId - UUID of the course
 *@returns {Promise<string|null>} - The final quiz id or null if not found
 */
async function getFinalQuizIdForCourse(courseId) {
    // for debugging
    console.log('At hasFinalQuizForRepository, getFinalQuizIdForCourse, Fetching final quiz ID for course:', courseId);
    const result = await database.oneOrNone(
        'SELECT final_quiz_id FROM HasFinalQuizFor WHERE course_id = $1',
        [courseId]
    );
    // for debugging
    console.log('At hasFinalQuizForRepository, getFinalQuizIdForCourse, Fetched final quiz ID for course:', result);
    return result ? result.final_quiz_id : null;
}

module.exports = {
    getFinalQuizIdForCourse,
};