const database = require('../database');

/**
 * Create a new log entry for answers associated with a quiz attempt.
 * @param {number} questionId - The ID of the question option.
 * @param {number} studentAnswerId - The ID of the student answer.
 * @returns {Promise<Object>} - The created log entry.
 */
const createRecord = async (questionId, studentAnswerId) => {
    const result = await database.query(
        'INSERT INTO loganswerforquestionwith (question_id, student_answer_id) VALUES ($1, $2) RETURNING *',
        [questionId, studentAnswerId]
    );
    return result[0];
}

/**
 * Get the record using the student answer ID.
 * @param {number} studentAnswerId - The ID of the student answer.
 * @returns {Promise<Object>} - The log entry record.
 */
const getRecord= async (studentAnswerId) => {
    console.log('At logAnswerForQuestionWithRepository, getRecord is called for:', { studentAnswerId });
    try {
        const result = await database.oneOrNone(
            'SELECT * FROM loganswerforquestionwith WHERE student_answer_id = $1',
            [studentAnswerId]
        );
        return result;
    } catch (error) {
        console.error('Error getting record from loganswerforquestionwith:', error);
        throw error;
    }
}

module.exports = {
    createRecord,
    getRecord
};
