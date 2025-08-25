const quizAttemptRepository = require('../repositories/quizAttemptRepository');
const logActiveAttemptForFinalQuizWithRepository = require('../repositories/logActiveAttemptForFinalQuizWithRepository');
const logActiveAttemptForStudentAtRepository = require('../repositories/logActiveAttemptForStudentAtRepository');
const logAnswerForAttemptWithRepository = require('../repositories/logAnswerForAttemptWithRepository.js');
const logPastAttemptForFinalQuizWithRepository = require('../repositories/logPastAttemptForFinalQuizWithRepository');
const logPastAttemptForStudentAtRepository = require('../repositories/logPastAttemptForStudentAtRepository');
const studentAnswerService = require('./studentAnswerService.js')

/**
 * Find all past quiz attempts for the student for a final quiz
 */
const getQuizAttemptsForStudent = async (studentCode, finalQuizId) => {
    // First find all quiz attempts of the student
    const quizAttempts = await logPastAttemptForStudentAtRepository.getAllPastAttemptsForStudent(studentCode);
    // Second, for each quiz attempt, find its associated final quiz and increase the attempt count
    let attemptCount = 0;
    for (const attempt of quizAttempts) {
        const finalQuiz = await logPastAttemptForFinalQuizWithRepository.checkFinalQuizAttemptsPair(finalQuizId, attempt.id);
        if (finalQuiz) {
            attemptCount++;
        }
    }
    return attemptCount;
}

/**
 * create a active quiz attempt.
 * @param {string} studentCode - The code of the student.
 * @param {number} finalQuizId - The ID of the final quiz.
 * @returns {Promise<Object>} - The created quiz attempt.
 */
const createQuizAttempt = async (studentCode, finalQuizId) => {
    // for debugging
    console.log('At quizAttemptService, createQuizAttempt is called for:', { studentCode, finalQuizId });
    // first create the quiz attempt
    // initial all attempt data
    const score = 0;
    const startedAt = new Date();
    const completedAt = null;
    const attemptStatus = 'in_progress';
    const updatedAt = new Date();
    // Count the number of past attempts of this final quiz
    const pastAttemptCount = await getQuizAttemptsForStudent(studentCode, finalQuizId);
    // initiate the attempt count by increase the pastAttemptCount by 1 to represent the current attempt
    const attemptCount = pastAttemptCount + 1;
    // create the quiz attempt
    const quizAttempt = await quizAttemptRepository.createQuizAttempt(score, startedAt, completedAt, attemptCount, attemptStatus, updatedAt);
    //for debugging
    console.log('At quizAttemptService, Created quiz attempt:', quizAttempt, 'type:', typeof quizAttempt);
    console.log('At quizAttemptService, Created quiz attempt ID:', quizAttempt[0].id);
    // link the active attempt to the final quiz
    await logActiveAttemptForFinalQuizWithRepository.createRecord(finalQuizId, quizAttempt[0].id);
    // link the active attempt to the student's current active attempt
    await logActiveAttemptForStudentAtRepository.createRecord(quizAttempt[0].id, studentCode);
    return quizAttempt;
}

/**
 * The function including all logic for student attempt a final quiz.
 * @param {string} studentCode - The code of the student.
 * @param {number} finalQuizId - The ID of the final quiz.
 * @returns {Promise<Object>} - An object containing the quiz attempt and associated student answers.
 */
const attemptFinalQuiz = async (studentCode, finalQuizId) => {
    // for debugging
    console.log('At quizAttemptService, attemptFinalQuiz is called for:', { studentCode, finalQuizId });
    // Create a new quiz attempt
    const quizAttempt = await createQuizAttempt(studentCode, finalQuizId);
    // for debugging
    console.log('At quizAttemptService, attemptFinalQuiz, Created quiz attempt:', quizAttempt);
    // Create student answers for the quiz attempt
    const studentAnswers = await studentAnswerService.createStudentAnswersAndRelatedForQuizAttempt(quizAttempt[0].id, finalQuizId);
    return {
        quizAttempt,
        studentAnswers
    };
}

/**
 * Find all student answers for a quiz attempt.
 * @param {number} quizAttemptId - The ID of the quiz attempt.
 * @returns {Promise<Array>} - An array of student answers for the quiz attempt.
 */
const getStudentAnswersForQuizAttempt = async (quizAttemptId) => {
    return await logAnswerForAttemptWithRepository.getLogEntriesForQuizAttempt(quizAttemptId);
}

/**
 * Calculate the score for a quiz attempt.
 * @param {number} quizAttemptId - The ID of the quiz attempt.
 * @returns {Promise<number>} - The calculated score for the quiz attempt.
 */
const calculateScoreForQuizAttempt = async (quizAttemptId) => {
    const studentAnswers = await getStudentAnswersForQuizAttempt(quizAttemptId);
    let score = 0;
    for (const studentAnswer of studentAnswers) {
        const isCorrect = await studentAnswerService.markStudentAnswerAndMore(studentAnswer.id);
        if (isCorrect) {
            score++;
        }
    }
    return score;
}

/**
 * Complete a quiz attempt.
 */
const completeQuizAttempt = async (finalQuizId, studentCode) => {
    // for debugging
    console.log('At quizAttemptService, Completing quiz attempt for:', { finalQuizId, studentCode });
    // Find the active attempt for this student and final quiz
    const activeQuizAttemptLink = await logActiveAttemptForStudentAtRepository.getRecord(studentCode);
    const activeQuizAttemptID = activeQuizAttemptLink.quiz_attempt_id;
    // for debugging
    console.log('At quizAttemptService, Found active quiz attempt ID:', activeQuizAttemptID);
    // calculate the score for this attempt
    const score = await calculateScoreForQuizAttempt(activeQuizAttemptID);
    const completedAt = new Date();
    const attemptStatus = 'completed';
    const updatedAt = new Date();
    const quizAttempt = await quizAttemptRepository.updateQuizAttempt(activeQuizAttemptID, score, completedAt, attemptStatus, updatedAt);
    // create past attempt record
    await logPastAttemptForFinalQuizWithRepository.createRecord(finalQuizId, activeQuizAttemptID);
    await logPastAttemptForStudentAtRepository.createRecord(activeQuizAttemptID, studentCode);
    // delete active attempt records
    await logActiveAttemptForFinalQuizWithRepository.deleteRecord(finalQuizId, activeQuizAttemptID);
    await logActiveAttemptForStudentAtRepository.deleteRecord(activeQuizAttemptID, studentCode);
    return quizAttempt;
}

module.exports = {
    getQuizAttemptsForStudent,
    createQuizAttempt,
    completeQuizAttempt,
    getStudentAnswersForQuizAttempt,
    attemptFinalQuiz
};