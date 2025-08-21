const database = require('../database');
/**
 * Find all the question items using a given final quiz ID.
 */

async function getQuestionsForFinalQuiz(finalQuizId) {
    const result = await database.query(
        'SELECT * FROM hasQuestionFor WHERE final_quiz_id = $1',
        [finalQuizId]
    );
    return result || [];
}

module.exports = {
    getQuestionsForFinalQuiz,
};
