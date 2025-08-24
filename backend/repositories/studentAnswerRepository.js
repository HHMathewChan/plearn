const database = require('../database');

/**
 * Create a new student answer.
 */
const createStudentAnswer = async (questionOptionId, isCorrect) => {
    const result = await database.query(
        'INSERT INTO studentanswer (id, selected_option_id, is_correct) VALUES (DEFAULT, $1, $2)',
        [questionOptionId, isCorrect]
    );
    return result[0];
}

module.exports = {
    createStudentAnswer
};
