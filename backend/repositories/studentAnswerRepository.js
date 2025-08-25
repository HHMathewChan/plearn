const database = require('../database');

/**
 * Create a new student answer.
 */
const createStudentAnswer = async (questionOptionId, isCorrect) => {
    // set default value for isCorrect
    if (!isCorrect) {
        isCorrect = null;
    }
    // set default value for questionOptionId
    if (!questionOptionId) {
        questionOptionId = null;
    }
    const result = await database.oneOrNone(
        'INSERT INTO studentanswer (id, selected_option_id, is_correct) VALUES (DEFAULT, $1, $2)RETURNING *',
        [questionOptionId, isCorrect]
    );
    return result;
}

/**
 * Update the correctness of a student answer.
 * @returns {Promise<Object|null>}
 */
const updateRecord = async (studentAnswerId, isCorrect) => {
    const result = await database.oneOrNone(
        'UPDATE studentanswer SET is_correct = $1 WHERE id = $2 RETURNING *',
        [isCorrect, studentAnswerId]
    );
    return result;
}

/**
 * Get a student answer by its ID.
 * @returns {Promise<Object|null>}
 */
const getRecordById = async (studentAnswerId) => {
    const result = await database.oneOrNone(
        'SELECT * FROM studentanswer WHERE id = $1',
        [studentAnswerId]
    );
    return result;
}

module.exports = {
    createStudentAnswer,
    updateRecord,
    getRecordById
};
