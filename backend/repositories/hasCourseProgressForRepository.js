const database = require('../database');

/**
 * Create a new entry in the has_course_progress_for table
 * @param {number} course_progress_id - The ID of the course progress entry
 * @param {string} studentCode - The code of the student
 */
async function createRecord(course_progress_id, studentCode) {
    const result = await database.oneOrNone(
        `INSERT INTO hascourseprogressfor (course_progress_id, student_code) VALUES ($1, $2)
        RETURNING *`,
        [course_progress_id, studentCode]
    );
    return result;
}

module.exports = {
    createRecord
};