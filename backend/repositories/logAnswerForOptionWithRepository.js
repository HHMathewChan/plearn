const database = require('../database');

/**
 * Create a new log entry for answers associated with a quiz attempt.
 */
const createLogAnswerForOptionWith = async (questionOptionId, studentAnswerId) => {
    const result = await database.query(
        'INSERT INTO loganswerforoptionwith (question_option_id, student_answer_id) VALUES ($1, $2)',
        [questionOptionId, studentAnswerId]
    );
    return result[0];
}

module.exports = {
    createLogAnswerForOptionWith
};
