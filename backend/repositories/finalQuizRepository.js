/**
 * Repository for final quizzes.
 */
const database = require('../database');

/**
 * Get a final quiz by its ID.
 *
 * @param {string} id - UUID of the final quiz
 * @returns {Promise<Object|null>} final quiz object or null if not found
 */
async function getFinalQuizById(id) {
    const result = await database.oneOrNone(
        'SELECT * FROM FinalQuiz WHERE id = $1',
        [id]
    );
    //for debugging
    console.log("at final quiz repository, final quiz loaded:", { result });
    return result || null;
}

module.exports = {
    getFinalQuizById,
};
