const database = require('../database');
/**
 * Repository for managing quiz attempts.
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
 */
const updateQuizAttempt = async (id, score, completedAt, attemptStatus, updatedAt) => {
    const result = await database.query(
        `UPDATE quizattempt SET score = $1, completed_at = $2, attempt_status = $3, updated_at = $4
        WHERE id = $5
        RETURNING *`,
        [score, completedAt, attemptStatus, updatedAt, id]
    );
    return result;
}

module.exports = {
    createQuizAttempt,
    updateQuizAttempt
};