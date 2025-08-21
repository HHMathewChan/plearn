/**
 * Repository for questions.
 */
const database = require('../database');

/**
 * Get a question by its ID.
 *
 * @param {string} id - UUID of the question
 * @returns {Promise<Object|null>} question object or null if not found
 */
async function getQuestionById(id) {
    const result = await database.oneOrNone(
        'SELECT * FROM Question WHERE id = $1',
        [id]
    );
    //for debugging
    console.log("at question repository, question loaded:", { result }, "type:", typeof result);
    return result || null;
}

module.exports = {
    getQuestionById,
};
