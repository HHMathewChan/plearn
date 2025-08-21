const database = require('../database');
/**
 * Find the final quiz for a given course.
 *
 */
async function getFinalQuizForCourse(courseId) {
    const result = await database.oneOrNone(
        'SELECT final_quiz_id FROM HasFinalQuizFor WHERE course_id = $1',
        [courseId]
    );
    return result ? result.final_quiz_id : null;
}

module.exports = {
    getFinalQuizForCourse,
};