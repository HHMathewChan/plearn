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
 * Update a student answer.
 * @param {number} studentAnswerId - The ID of the student answer.
 * @param {number} selected_option_id - The ID of the selected option.
 * @param {boolean} isCorrect - Whether the answer is correct.
 * @returns {Promise<Object|null>}
 */
const updateRecord = async (studentAnswerId, selected_option_id, isCorrect) => {
    console.log('At studentAnswerRepository, updateRecord is called for:', { studentAnswerId, selected_option_id, isCorrect });
    // set default value for selected_option_id
    if (!selected_option_id) {
        selected_option_id = null;
    }
    // set default value for isCorrect
    if (!isCorrect) {
        isCorrect = null;
    }
    const result = await database.oneOrNone(
        'UPDATE studentanswer SET is_correct = $1, selected_option_id = $2 WHERE id = $3 RETURNING *',
        [isCorrect, selected_option_id, studentAnswerId]
    );
    return result;
}

/**
 * Update correctness of a student answer.
 * @param {number} studentAnswerId - The ID of the student answer.
 * @param {boolean} isCorrect - Whether the answer is correct.
 * @returns {Promise<Object|null>}
 */
const updateCorrectness = async (studentAnswerId, isCorrect) => {
    console.log('At studentAnswerRepository, updateCorrectness is called for:', { studentAnswerId, isCorrect });
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
    getRecordById,
    updateCorrectness
};
