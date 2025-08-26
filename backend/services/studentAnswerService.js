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
const questionService = require('./questionService');

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
 * Update the student's answers for a quiz attempt.
 * @param {Array} existingAnswers - The array of existing student answers objects.
 * @param {Array} studentAnswers - The updated student answers containing objects of question IDs and their selected options.
 * @returns {Promise<boolean>} - True if the update was successful, false otherwise.
 */
const updateStudentAnswersForQuizAttempt = async (existingAnswers, studentAnswers) => {
    // for debugging
    console.log('At studentAnswerService, updateStudentAnswersForQuizAttempt is called for:', { existingAnswers, studentAnswers });

    // Update the student answers with the new selected options in the repository
    for (const existingAnswer of existingAnswers) {
        // First find the corresponding question from LogAnswerForQuestionWithRepository
        const correspondingQuestion = await logAnswerForQuestionWithRepository.getRecord(existingAnswer.id);
        console.log('At studentAnswerService, Found corresponding question for existing answer:', { existingAnswerId: existingAnswer.id, correspondingQuestion });
        // Find the corresponding question_option_id in student answer
        const updatedAnswer = studentAnswers.find(answer => answer.question_id === correspondingQuestion.question_id);
        console.log('At studentAnswerService, Found updated answer for corresponding question:', { correspondingQuestionId: correspondingQuestion.question_id, updatedAnswer });
        const updatedOptionId = updatedAnswer ? updatedAnswer.option_id : null;
        console.log('At studentAnswerService, Updating existing answer with new option ID:', { existingAnswerId: existingAnswer.id, updatedOptionId });
        // Update the existing answer with the new option ID
        await studentAnswerRepository.updateRecord(existingAnswer.id, updatedOptionId);
    }
    // Return true if all updates were successful
    return true;
}

/**
 * Marking the student answers. Update the student's answer status.
 * @param {number} studentAnswerId - The ID of the student answer.
 * @returns {Promise<boolean>} - true if the answer is correct, false otherwise
 */
const markStudentAnswerAndMore = async (studentAnswerId) => {
    // for debugging
    console.log('At studentAnswerService, markStudentAnswerAndMore is called for:', { studentAnswerId });
    // Find out the correct answer for the question
    // Step 1 Find the links
    const links = await logAnswerForQuestionWithRepository.getRecord(studentAnswerId);
    console.log('At studentAnswerService, markStudentAnswerAndMore,Found links for student answer:', { studentAnswerId, links });
    // Step 2 Retrieve the question
    const question = await questionService.getQuestionById(links.question_id);
    console.log('At studentAnswerService, markStudentAnswerAndMore, Found question for student answer:', { studentAnswerId, question });
    const correctAnswerId = question.correct_option_id;
    // Step 3 Find the student selected option
    const studentAnswer = await studentAnswerRepository.getRecordById(studentAnswerId);
    console.log('At studentAnswerService, markStudentAnswerAndMore, Found student answer:', { studentAnswerId, studentAnswer });
    // Then mark the student's answer as correct or incorrect
    console.log('At studentAnswerService, markStudentAnswerAndMore, selected option ID and correct answer ID are:', { studentAnswerId, correctAnswerId });
    const isCorrect = studentAnswer.selected_option_id === correctAnswerId;
    console.log('At studentAnswerService, markStudentAnswerAndMore, Marking student answer as:', { studentAnswerId, isCorrect });
    await studentAnswerRepository.updateCorrectness(studentAnswerId, isCorrect);
    return isCorrect;
};

module.exports = {
    createStudentAnswersAndRelatedForQuizAttempt,
    markStudentAnswerAndMore,
    updateStudentAnswersForQuizAttempt
};