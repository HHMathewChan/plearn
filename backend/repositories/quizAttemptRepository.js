const database = require('../database');
/**
 * @fileoverview Repository for managing quiz attempts.
 */

/**
 * Create a new quiz attempt.
 */
const createQuizAttempt = async (score, startedAt, completedAt, attemptCount, attemptStatus, updatedAt) => {
    const result = await database.query(
        `INSERT INTO quizattempt (id, score, started_at, completed_at, attempt_count, attempt_status, updated_at) 
        VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [score, startedAt, completedAt, attemptCount, attemptStatus, updatedAt]
    );
    return result;
}

/**
 * Update an existing quiz attempt.
 * @param {number} id - The ID of the quiz attempt to update.
 * @param {number} score - The updated score for the quiz attempt. can be null
 * @param {Date} completedAt - The completion date for the quiz attempt.
 * @param {string} attemptStatus - The updated status of the quiz attempt.
 * @param {Date} updatedAt - The date when the quiz attempt was last updated.
 */
const updateQuizAttempt = async (id, score, completedAt, attemptStatus, updatedAt) => {
    console.log('At quizAttemptRepository first line, updateQuizAttempt is called for:', { id, score, completedAt, attemptStatus, updatedAt });
    // set score to null if no score is provided
    if (score === undefined || score === null) {
        score = null;
    }
    console.log('At quizAttemptRepository, updateQuizAttempt is called for:', { id, score, completedAt, attemptStatus, updatedAt });
    const result = await database.query(
        `UPDATE quizattempt SET score = $1, completed_at = $2, attempt_status = $3, updated_at = $4
        WHERE id = $5
        RETURNING *`,
        [score, completedAt, attemptStatus, updatedAt, id]
    );
    // Log the result for debugging
    console.log('At quizAttemptRepository, updateQuizAttempt result:', result);
    return result;
}

/**
 * get quiz attempt using its id
 * @param {number} id - The ID of the quiz attempt to retrieve.
 * @returns {Promise<Object|null>} - The quiz attempt object if found, otherwise null.
 */
const getQuizAttemptById = async (id) => {
    const result = await database.oneOrNone(
        `SELECT * FROM quizattempt WHERE id = $1`,
        [id]
    );
    return result;
}

module.exports = {
    createQuizAttempt,
    updateQuizAttempt,
    getQuizAttemptById
};