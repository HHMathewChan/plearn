const database = require('../database');

/**
 * Create a new log entry for answers associated with a quiz attempt.
 */
const createLogAnswerForAttemptWith = async (quizAttemptId, studentAnswerId) => {
    const result = await database.query(
        'INSERT INTO loganswerforattemptwith (quiz_attempt_id, student_answer_id) VALUES ($1, $2)',
        [quizAttemptId, studentAnswerId]
    );
    return result[0];
}

module.exports = {
    createLogAnswerForAttemptWith
};