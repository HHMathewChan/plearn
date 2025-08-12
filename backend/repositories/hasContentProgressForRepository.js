const database = require('../database');

/**
 * Creates a new HasContentProgressFor record linking content progress to a student.
 * @param {string} contentProgressId - The UUID of the content progress record.
 * @param {string} studentCode - The code identifying the student.
 * @returns {Promise<void>}
 */
async function createHasContentProgressFor(contentProgressId, studentCode) {
    await database.query(
        `INSERT INTO HasContentProgressFor (content_progress_id, student_code)
         VALUES ($1, $2)`,
        [contentProgressId, studentCode]
    );
}

/**
 * Retrieves all content progress records for a specific student.
 * @param {string} studentCode - The code identifying the student.
 * @returns {Promise<Array>} - An array of content progress records.
 */
async function getAllContentProgress(studentCode) {
    const result = await database.query(
        `SELECT h.content_progress_id, h.student_code
         FROM HasContentProgressFor h
         WHERE h.student_code = $1`,
        [studentCode]
    );
    // for debugging
    console.log("The fetching result are:", result);
    return result;
}

module.exports = {
    createHasContentProgressFor,
    getAllContentProgress,
};