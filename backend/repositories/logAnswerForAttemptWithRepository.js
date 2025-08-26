const database = require('../database');

/**
 * Create a new entry for answers associated with a quiz attempt.
 * @param {number} quizAttemptId - The ID of the quiz attempt.
 * @param {number} studentAnswerId - The ID of the student answer.
 * @returns {Promise<Object>} - The created log entry.
 */
const createRecord = async (quizAttemptId, studentAnswerId) => {
    const result = await database.query(
        `INSERT INTO loganswerforattemptwith (quiz_attempt_id, student_answer_id) 
        VALUES ($1, $2)
        RETURNING *`,
        [quizAttemptId, studentAnswerId]
    );
    return result[0];
};

/**
 * Get all log entries for answers associated with a quiz attempt.
 * @param {number} quizAttemptId - The ID of the quiz attempt.
 * @returns {Promise<Array>} - An array of log entries for the quiz attempt.
 */
const getRecordsForQuizAttempt = async (quizAttemptId) => {
    // for debugging
    console.log('At logAnswerForAttemptWithRepository, getRecordsForQuizAttempt is called for:', { quizAttemptId });
    const result = await database.any(
        'SELECT * FROM loganswerforattemptwith WHERE quiz_attempt_id = $1',
        [quizAttemptId]
    );
    console.log('At logAnswerForAttemptWithRepository, getRecordsForQuizAttempt, Found records:', result);
    return result;
}

module.exports = {
    createRecord,
    getRecordsForQuizAttempt
};