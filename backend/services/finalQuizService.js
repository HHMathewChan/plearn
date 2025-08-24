/**
 * This service handles operations related to final quizzes.
 */
const hasFinalQuizForRepo = require('../repositories/hasFinalQuizForRepository');
const hasQuestionForRepo = require('../repositories/hasQuestionForRepository');
const questionOptionRepo = require('../repositories/questionOptionRepository');
const finalQuizRepo = require('../repositories/finalQuizRepository');
const questionRepo = require('../repositories/questionRepository');

/**
 * Get the final quiz for a course, including questions and each question's options.
 *
 * @param {string} courseId - UUID of the course
 * @returns {Promise<Object|null>} final quiz object or null if not found
 *
 * Returned structure:
 * {
 *   id,
 *   title,
 *   questions: [
 *     {
 *       id,
 *       question_text,
 *       difficulty,
 *       options: [
 *         { id, option_text, is_correct }
 *       ]
 *     },
 *     ...
 *   ]
 * }
 */
async function getFinalQuizWithQuestions(courseId) {
    // Find final quiz id for the course
    const finalQuizId = await hasFinalQuizForRepo.getFinalQuizForCourse(courseId);
    if (!finalQuizId) {
        return null;
    }

    // Load final quiz metadata (title)
    const finalQuiz = await finalQuizRepo.getFinalQuizById(finalQuizId);
    if (!finalQuiz) {
        return null;
    }

    // Find all question links for the final quiz
    const questionLinks = await hasQuestionForRepo.getQuestionsForFinalQuiz(finalQuizId);
    const questions = [];

    for (const link of questionLinks) {
        // Expecting the link to contain question_id
        const questionId = link.question_id;
        if (!questionId) continue;

        // Load question details
        const question = await questionRepo.getQuestionById(questionId);
        // for debugging
        console.log("at question service, question loaded:", { question }, "type:", typeof question);
        if (!question) continue;

        // Load options for this question
        const options = await questionOptionRepo.getQuestionOptionsForQuestion(questionId);

        // Map options and mark the correct one
        const mappedOptions = (options || []).map(option => ({
            id: option.id,
            option_text: option.option_text
        }));

        questions.push({
            id: question.id,
            question_text: question.question_text,
            difficulty: question.difficulty,
            options: mappedOptions
        });
    }
    //for debugging
    console.log("at final quiz service, final quiz loaded:", { finalQuiz }, "type:", typeof finalQuiz);
    console.log("id:", finalQuiz.id, "title:", finalQuiz.title);
    return {
        id: finalQuiz.id,
        title: finalQuiz.title,
        questions
    };
}

module.exports = {
    getFinalQuizWithQuestions,
};