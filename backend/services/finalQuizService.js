/**
 * This service handles operations related to final quizzes.
 */
const hasFinalQuizForRepo = require('../repositories/hasFinalQuizForRepository');
const hasQuestionForRepo = require('../repositories/hasQuestionForRepository');
const questionOptionRepo = require('../repositories/questionOptionRepository');
const finalQuizRepo = require('../repositories/finalQuizRepository');
const questionRepo = require('../repositories/questionRepository');

/**
 * Find out how many questions are in a final quiz.
 * @param {string} finalQuizId - UUID of the final quiz
 * @returns {Promise<number>} - The number of questions in the final quiz
 */
const getQuestionCountForFinalQuiz = async (finalQuizId) => {
    const questions = await hasQuestionForRepo.getQuestionsForFinalQuiz(finalQuizId);
    return questions.length;
};

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
    const finalQuizId = await hasFinalQuizForRepo.getFinalQuizIdForCourse(courseId);
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

/**
 * Check if any of the final quiz attempts were passed for the given course.
 * @param {Array} pastAttemptsWithFinalQuiz - An array of objects containing past quiz attempts with their final quiz IDs.
 * @param {string} courseId - The ID of the course.
 * @returns {Promise<boolean>} - True if any final quiz was attempted and passed, false otherwise.
 */
const checkIfFinalQuizAttemptedAndPassed = async (pastAttemptsWithFinalQuiz, courseId) => {
    // for debugging
    console.log('At finalQuizService, Checking past attempts for final quiz:', { pastAttemptsWithFinalQuiz, courseId });
    // For each pastAttemptsWithFinalQuiz, check if it was passed by first get the final quiz by its id, then check if its course id matches the given course id
    for (const { attempt, finalQuizId } of pastAttemptsWithFinalQuiz) {
        //for debugging
        console.log('At finalQuizService, checkIfFinalQuizAttemptedAndPassed:', { attempt, finalQuizId });
        const finalQuiz = await finalQuizRepo.getFinalQuizById(finalQuizId);
        if (finalQuiz && finalQuiz.course_id === courseId) {
            if (attempt.status === 'passed' && attempt.score > finalQuiz.passing_score) {
                return true;
            }
        }
    }
    return false;
};

module.exports = {
    getFinalQuizWithQuestions,
    getQuestionCountForFinalQuiz,
    checkIfFinalQuizAttemptedAndPassed
};