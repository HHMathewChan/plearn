const database = require('../database');

/**
 * Create a new log entry for answers associated with a quiz attempt.
 * @param {number} questionOptionId - The ID of the question option.
 * @param {number} studentAnswerId - The ID of the student answer.
 * @returns {Promise<Object>} - The created log entry.
 */
const createRecord = async (questionOptionId, studentAnswerId) => {
    const result = await database.query(
        'INSERT INTO loganswerforoptionwith (question_option_id, student_answer_id) VALUES ($1, $2) RETURNING *',
        [questionOptionId, studentAnswerId]
    );
    return result[0];
}

module.exports = {
    createRecord
};
