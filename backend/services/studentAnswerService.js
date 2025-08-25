const quizAttemptRepository = require('../repositories/quizAttemptRepository');
const studentAnswerRepository = require('../repositories/studentAnswerRepository');
const logAnswerForQuestionWithRepository = require('../repositories/logAnswerForQuestionWithRepository');
const logActiveAttemptForFinalQuizWithRepository = require('../repositories/logActiveAttemptForFinalQuizWithRepository');
const logActiveAttemptForStudentAtRepository = require('../repositories/logActiveAttemptForStudentAtRepository');
const logAnswerForAttemptWithRepository = require('../repositories/logAnswerForAttemptWithRepository.js');
const logPastAttemptForFinalQuizWithRepository = require('../repositories/logPastAttemptForFinalQuizWithRepository');
const logPastAttemptForStudentAtRepository = require('../repositories/logPastAttemptForStudentAtRepository');
const questionOptionRepository = require('../repositories/questionOptionRepository');
const hasFinalQuizForRepository = require('../repositories/hasFinalQuizForRepository');
const hasQuestionForRepository = require('../repositories/hasQuestionForRepository');

/**
 * Create a new student answer for each question option in a quiz attempt.
 * @param {number} quizAttemptId - The ID of the quiz attempt.
 * @param {number} finalQuizId - The ID of the final quiz.
 * @returns {Promise<Array>} - An array of created student answer.
 */
const createStudentAnswersAndRelatedForQuizAttempt = async (quizAttemptId, finalQuizId) => {
    // for debugging
    console.log('At studentAnswerService, createStudentAnswersAndRelatedForQuizAttempt is called for:', { quizAttemptId, finalQuizId });
    const createdAnswers = [];
    // find all the questions of this final quiz
    const links = await hasQuestionForRepository.getQuestionsForFinalQuiz(finalQuizId);
    // for debugging
    console.log('At studentAnswerService, Found links for final quiz:', links);
    for (const link of links) {
        // first create a student answer
        const createdAnswer = await studentAnswerRepository.createStudentAnswer();
        // then link the created answer to the quiz attempt
        await logAnswerForAttemptWithRepository.createRecord(quizAttemptId, createdAnswer.id);
        // and link the created answer to the question
        await logAnswerForQuestionWithRepository.createRecord(link.question_id, createdAnswer.id);
        createdAnswers.push(createdAnswer);
    }
    return createdAnswers;
}

/**
 * Marking the student answers. Update the student's answer status.
 * @param {number} studentAnswerId - The ID of the student answer.
 * @returns {Promise<boolean>} - true if the answer is correct, false otherwise
 */
const markStudentAnswerAndMore = async (studentAnswerId) => {
    // for debugging
    console.log('At studentAnswerService, markStudentAnswerAndMore is called for:', { studentAnswerId });
    // Step 1 find out the correct answer for the question
    // Step 1.1 Find the question based on the question_option_id
    const question = await logAnswerForQuestionWithRepository.getQuestionByStudentAnswerId(studentAnswerId);
    const correctAnswerId = question[0].correct_option_id;

    // Then mark the student's answer as correct or incorrect
    const isCorrect = studentAnswerId === correctAnswerId;
    await studentAnswerRepository.updateRecord(studentAnswerId, isCorrect);
    return isCorrect;
};

module.exports = {
    createStudentAnswersAndRelatedForQuizAttempt,
    markStudentAnswerAndMore
};