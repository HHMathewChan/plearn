const questionRepository = require ('../repositories/questionRepository.js')

/**
 * Get a question by its ID.
 * @param {number} questionId - The ID of the question.
 * @returns {Promise<Object|null>}
 */
const getQuestionById = async (questionId) => {
    console.log('At questionService, getQuestionById is called for:', { questionId });
    const result = await questionRepository.getQuestionById(questionId);
    console.log('At questionService, getQuestionById result:', { result });
    return result;
}

module.exports = {
    getQuestionById
};