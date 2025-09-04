/**
 * @fileoverview Course content progress repository for database operations
 */
const database = require('../database');

/**
 * Retrieves a content progress record by its ID.
 * @param {string} contentProgressId - The ID of the content progress record.
 * @returns {Promise<Object|null>} - The content progress record, or null if not found.
 */
async function getContentProgress(contentProgressId) {
    const result = await database.oneOrNone(
        'SELECT * FROM ContentProgress WHERE id = $1',
        [contentProgressId]
    );
    // for debugging
    console.log("At ContentProgressRepository - Fetched content progress:", result);
    return result;
}

/**
 * Retrieves a content progress record by its content ID.
 * @param {string} contentId - The ID of the content item.
 * @returns {Promise<Object|null>} - The content progress record, or null if not found.
 */
async function getContentProgressByContentId(contentId) {
    const result = await database.oneOrNone(
        'SELECT * FROM ContentProgress WHERE content_id = $1',
        [contentId]
    );
    // for debugging
    console.log("At ContentProgressRepository - Fetched content progress by content ID:", result);
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
    const result = await database.query(
        `UPDATE ContentProgress
         SET content_id = $2 ,status = $3, date_completed = $4, last_updated = $5
         WHERE id = $1
         RETURNING *`,
        [contentProgressId, contentId, status, dateCompleted, lastUpdate]
    );
    return result;
}

module.exports = {
    getContentProgress,
    createContentProgress,
    updateContentProgress,
    getContentProgressByContentId
};