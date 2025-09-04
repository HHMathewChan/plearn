const database = require('../database');

/**
 * Check if a specific final quiz and quiz attempt pair exists
 */
async function checkFinalQuizAttemptsPair(finalQuizId, quizAttemptId) {
    const result = await database.oneOrNone(
        'SELECT * FROM logpastattemptforfinalquizwith WHERE final_quiz_id = $1 AND quiz_attempt_id = $2',
        [finalQuizId, quizAttemptId]
    );
    return result;
}

/**
 * Create a new log entry for past attempts associated with a final quiz.
 */
async function createRecord(finalQuizId, quizAttemptId) {
    const result = await database.query(
        'INSERT INTO logpastattemptforfinalquizwith (final_quiz_id, quiz_attempt_id) VALUES ($1, $2)',
        [finalQuizId, quizAttemptId]
    );
    return result[0];
}

/**
 * get the final quiz id using the quiz attempt id
 * @param {number} quizAttemptId - The ID of the quiz attempt.
 * @returns {Promise<number|null>} - The ID of the final quiz or null if not found.
 */
async function getFinalQuizIdForQuizAttempt(quizAttemptId) {
    const result = await database.oneOrNone(
        'SELECT final_quiz_id FROM logpastattemptforfinalquizwith WHERE quiz_attempt_id = $1',
        [quizAttemptId]
    );
    return result ? result.final_quiz_id : null;
}

module.exports = {
    checkFinalQuizAttemptsPair,
    createRecord,
    getFinalQuizIdForQuizAttempt
};
