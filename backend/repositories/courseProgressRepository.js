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

/**
 * Find a course progress record by student code and course ID.
 * @param {string} studentCode - The code of the student.
 * @param {number} courseId - The ID of the course.
 * @returns {Promise<object|null>} The course progress record or null if not found.
 */
async function findRecord(studentCode, courseId) {
    const result = await database.oneOrNone(
        `SELECT * FROM courseprogress WHERE student_code = $1 AND course_id = $2`,
        [studentCode, courseId]
    );
    return result;
}

/**
 * Complete a course progress record.
 * @param {string} studentCode - The code of the student.
 * @param {number} courseId - The ID of the course.
 * @returns {Promise<object|null>} The updated course progress record or null if not found.
 */
async function completeCourseProgress(studentCode, courseId) {
    const result = await database.oneOrNone(
        `UPDATE courseprogress 
        SET status = $1, date_completed = $2, last_updated = $3 
        WHERE student_code = $4 AND course_id = $5 
        RETURNING *`,
        ['completed', new Date(), new Date(), studentCode, courseId]
    );
    return result;
}

/**
 * Get all completed courses for a student
 * @param {string} studentCode - The code of the student
 * @returns {Array} An array of completed course progress objects.
 */
async function getCompletedCoursesForStudent(studentCode) {
    const results = await database.manyOrNone(
        `SELECT * FROM courseprogress WHERE student_code = $1 AND status = $2`,
        [studentCode, 'completed']
    );
    return results;
}

module.exports = {
    createRecord,
    findRecord,
    completeCourseProgress,
    getCompletedCoursesForStudent
};