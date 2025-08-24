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

module.exports = {
    checkFinalQuizAttemptsPair,
    createRecord
};
