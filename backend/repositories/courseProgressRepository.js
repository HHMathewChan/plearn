const database = require('../database');

/**
 * Create a new course progress entry
 * @param {string} studentCode - The code of the student
 * @param {number} courseId - The ID of the course
 * @param {string} status - The status of the course progress
 * @param {Date} date_completed - The date the course was completed
 * @param {Date} last_updated - The date the course progress was last updated
 */
async function createRecord(studentCode, courseId, status, date_completed, last_updated) {
    const result = await database.oneOrNone(
        `INSERT INTO courseprogress (id, student_code, course_id, status, date_completed, last_updated) 
        VALUES (DEFAULT, $1, $2, $3, $4, $5)
        RETURNING *`,
        [studentCode, courseId, status, date_completed, last_updated]
    );
    return result;
}

async function findRecord(studentCode, courseId) {
    const result = await database.oneOrNone(
        `SELECT * FROM courseprogress WHERE student_code = $1 AND course_id = $2`,
        [studentCode, courseId]
    );
    return result;
}

module.exports = {
    createRecord,
    findRecord
};