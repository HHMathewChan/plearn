/**
 * @fileoverview Course content progress repository for database operations
 */
const database = require('../database');

async function getContentProgress(contentProgressId) {
    const result = await database.query(
        'SELECT * FROM ContentProgress WHERE id = $1',
        [contentProgressId]
    );
    // for debugging
    console.log("At ContentProgressRepository - Fetched content progress:", result);
    return result;
}

async function createContentProgress(contentId, status, date_completed, last_updated) {
    // for debugging
    console.log("Creating content progress with content ID:", contentId, "status:", status);
    const result = await database.one(
        `INSERT INTO ContentProgress (id, content_id, status, date_completed, last_updated)
         VALUES (DEFAULT,$1, $2, $3, $4)
         RETURNING id`,
        [contentId, status, date_completed, last_updated]
    );
    return result.id;
}

/**
 * Updates an existing content progress record.
 * @param {number} contentProgressId
 * @param {number} contentId
 * @param {string} status
 * @param {Date} dateCompleted
 * @param {Date} lastUpdate
 * @returns {Promise<void>}
 */
async function updateContentProgress(contentProgressId, contentId, status, dateCompleted, lastUpdate) {
    // for debugging
    console.log("At contentProgressRepository - Updating content progress for ID:", contentProgressId);
    await database.query(
        `UPDATE ContentProgress
         SET content_id = $2 ,status = $3, date_completed = $4, last_updated = $5
         WHERE id = $1`,
        [contentProgressId, contentId, status, dateCompleted, lastUpdate]
    );
}

module.exports = {
    getContentProgress,
    createContentProgress,
    updateContentProgress,
};