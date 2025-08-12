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

/**
 * Retrieves the content progress ID for a specific student and content item.
 * @param {string} studentCode - The code identifying the student.
 * @param {string} contentId - The ID of the content item.
 * @returns {Promise<string|null>} - The content progress ID, or null if not found.
 */
async function getContentProgressId(studentCode, contentId) {
    const result = await database.query(
        `SELECT h.content_progress_id
         FROM HasContentProgressFor h
         JOIN ContentProgress c ON h.content_progress_id = c.id
         WHERE h.student_code = $1 AND c.content_id = $2`,
        [studentCode, contentId]
    );
    return result.length > 0 ? result[0].content_progress_id : null;
}

module.exports = {
    createHasContentProgressFor,
    getAllContentProgress,
    getContentProgressId
};