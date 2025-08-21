const database = require('../database');
/**
 * Find all the Question options for a given question.
 */
async function getQuestionOptionsForQuestion(questionId) {
    const result = await database.query(
        'SELECT * FROM questionOption WHERE question_id = $1',
        [questionId]
    );
    return result || [];
}

module.exports = {
    getQuestionOptionsForQuestion,
};
