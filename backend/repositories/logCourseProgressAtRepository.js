const database = require('../database');

/**
 * Create a new entry in the log_course_progress_at table
 * @param {number} course_id - The ID of the course
 * @param {number} course_progress_id - The ID of the course progress entry
 */
async function createRecord(course_id, course_progress_id) {
    const result = await database.oneOrNone(
        `INSERT INTO logcourseprogressat (course_id, course_progress_id) VALUES ($1, $2)
        RETURNING *`,
        [course_id, course_progress_id]
    );
    return result;
}

module.exports = {
    createRecord
};