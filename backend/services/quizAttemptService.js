const quizAttemptRepository = require('../repositories/quizAttemptRepository');
const logActiveAttemptForFinalQuizWithRepository = require('../repositories/logActiveAttemptForFinalQuizWithRepository');
const logActiveAttemptForStudentAtRepository = require('../repositories/logActiveAttemptForStudentAtRepository');
const logAnswerForAttemptWithRepository = require('../repositories/logAnswerForAttemptWithRepository.js');
const logPastAttemptForFinalQuizWithRepository = require('../repositories/logPastAttemptForFinalQuizWithRepository');
const logPastAttemptForStudentAtRepository = require('../repositories/logPastAttemptForStudentAtRepository');
const studentAnswerService = require('./studentAnswerService.js')
const hasFinalQuizForRepository = require ('../repositories/hasFinalQuizForRepository');
const studentAnswerRepository = require('../repositories/studentAnswerRepository');
const courseService = require('./courseService');
const finalQuizService = require('./finalQuizService');

/**
 * Count the number of past quiz attempts for the student for a final quiz
 * @param {string} studentCode - The code of the student.
 * @param {number} finalQuizId - The ID of the final quiz.
 * @returns {Promise<number>} - The count of past quiz attempts for the student for the final quiz.
 */
const CountPastQuizAttemptsForStudent = async (studentCode, finalQuizId) => {
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
    const pastAttemptCount = await CountPastQuizAttemptsForStudent(studentCode, finalQuizId);
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
 * @param {number} courseId - The ID of the course.
 * @returns {Promise<Object>} - An object containing the quiz attempt and associated student answers.
 */
const attemptFinalQuiz = async (studentCode, courseId) => {
    // for debugging
    console.log('At quizAttemptService, attemptFinalQuiz is called for:', { studentCode, courseId });
    // Find the final quiz ID for the course
    const finalQuizId = await hasFinalQuizForRepository.getFinalQuizIdForCourse(courseId);
    // for debugging
    console.log('At quizAttemptService, attemptFinalQuiz, Found final quiz ID:', finalQuizId);
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
    // for debugging
    console.log('At quizAttemptService, getStudentAnswersForQuizAttempt is called for:', { quizAttemptId });
    const links = await logAnswerForAttemptWithRepository.getRecordsForQuizAttempt(quizAttemptId);
    console.log('At quizAttemptService, getStudentAnswersForQuizAttempt, Found links:', links);
    // Find the student answers calling getRecordById the student_answer_id in the links
    const studentAnswers = await Promise.all(links.map(link => studentAnswerRepository.getRecordById(link.student_answer_id)));
    console.log('At quizAttemptService, getStudentAnswersForQuizAttempt, Found student answers:', studentAnswers);
    return studentAnswers;
}

/**
 * Update the student's answers for a quiz attempt.
 * @param {number} quizAttemptId - The ID of the quiz attempt.
 * @param {Array} studentAnswers - The updated student answers containing objects of question IDs and their selected options.
 * @returns {Promise<boolean>} - True if the update was successful, false otherwise.
 */
// const updateStudentAnswersForQuizAttempt = async (quizAttemptId, studentAnswers) => {
//     // for debugging
//     console.log('At quizAttemptService, updateStudentAnswersForQuizAttempt is called for:', { quizAttemptId });
//     // Find all the student answers for this quiz attempt
//     const existingAnswers = await getStudentAnswersForQuizAttempt(quizAttemptId);
//     // for debugging
//     console.log('At quizAttemptService, updateStudentAnswersForQuizAttempt, Existing answers found:', existingAnswers);
//     // Update the student answers in the repository
//     await studentAnswerService.updateStudentAnswersForQuizAttempt(existingAnswers, studentAnswers);
//     // Return true if all updates were successful
//     return true;
// }

const updateStudentAnswersForQuizAttempt = async (quizAttemptId, studentAnswers) => {
    try {
        console.log('Updating student answers for quizAttemptId:', quizAttemptId);
        const existingAnswers = await getStudentAnswersForQuizAttempt(quizAttemptId);
        console.log('Existing answers:', existingAnswers);
        await studentAnswerService.updateStudentAnswersForQuizAttempt(existingAnswers, studentAnswers);
        console.log('At quizAttemptService, updateStudentAnswersForQuizAttempt, Student answers updated successfully.');
        return true;
    } catch (error) {
        console.error('Error updating student answers:', error);
        throw error;
    }
};

/**
 * Calculate the score for a quiz attempt.
 * @param {number} quizAttemptId - The ID of the quiz attempt.
 * @returns {Promise<number>} - The calculated score for the quiz attempt.
 */
const calculateScoreForQuizAttempt = async (quizAttemptId) => {
    const studentAnswers = await getStudentAnswersForQuizAttempt(quizAttemptId);
    let correctCount = 0;
    let totalQuestions = studentAnswers.length;
    for (const studentAnswer of studentAnswers) {
        const isCorrect = await studentAnswerService.markStudentAnswerAndMore(studentAnswer.id);
        if (isCorrect) {
            correctCount++;
        }
    }
    return (correctCount / totalQuestions) * 100;
}

/**
 * Complete a quiz attempt.
 * @param {number} courseId - The ID of the course.
 * @param {string} studentCode - The code of the student.
 * @param {Array} studentAnswers - The student's answers for the quiz.
 * @returns {Promise<Object>} - The completed quiz attempt.
 */
const completeQuizAttempt = async (courseId, studentCode, studentAnswers) => {
    // for debugging
    console.log('At quizAttemptService, Completing quiz attempt for:', { courseId, studentCode });
    // console.log('At quizAttemptService, Completing quiz attempt, student answers received:', studentAnswers);
    // Find the final quiz ID for the course
    const finalQuizId = await hasFinalQuizForRepository.getFinalQuizIdForCourse(courseId);
    // for debugging
    console.log('At quizAttemptService, Found final quiz ID:', finalQuizId);
    // Find the active attempt for this student and final quiz
    const activeQuizAttemptLink = await logActiveAttemptForStudentAtRepository.getRecord(studentCode);
    const activeQuizAttemptID = activeQuizAttemptLink.quiz_attempt_id;
    // for debugging
    console.log('At quizAttemptService, Found active quiz attempt ID:', activeQuizAttemptID);
    // Update the student's answers for the quiz attempt
    await updateStudentAnswersForQuizAttempt(activeQuizAttemptID, studentAnswers);
    // calculate the score for this attempt
    //for debugging
    console.log('At quizAttemptService, completeQuizAttempt, going to calculate score for quiz attempt:', { activeQuizAttemptID });
    const score = await calculateScoreForQuizAttempt(activeQuizAttemptID);
    // for debugging
    console.log('At quizAttemptService, completeQuizAttempt, Calculated score for quiz attempt:', { score });
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

/**
 * Check if a student has attempted and passed a quiz.
 * @param {Array} pastAttemptIds - The past attempt IDs for the student.
 * @param {number} courseId - The ID of the course.
 * @returns {Promise<boolean>} - True if the quiz was attempted and passed, false otherwise.
 */
const checkIfQuizAttemptedAndPassed = async (pastAttemptIds, courseId) => {
    // for debugging
    console.log('At quizAttemptService, Checking if quiz attempted and passed for:', { pastAttemptIds, courseId });
    // First fetch the past attempts
    const pastAttempts = await Promise.all(pastAttemptIds.map(attemptId => quizAttemptRepository.getQuizAttemptById(attemptId)));
    // Find the final quiz ID for each past attempt and map them together, an array of objects should be produced, each object contain the past attempt and its final quiz ID
    const pastAttemptsWithFinalQuiz = await Promise.all(pastAttempts.map(async attempt => {
        const finalQuizId = await logPastAttemptForFinalQuizWithRepository.getFinalQuizIdForQuizAttempt(attempt.id);
        return { attempt, finalQuizId };
    }));
    // Ask final quiz service to check if any of the past attempts are for the course and were passed
    const result = await finalQuizService.checkIfFinalQuizAttemptedAndPassed(pastAttemptsWithFinalQuiz, courseId);
    return result;
};

module.exports = {
    CountPastQuizAttemptsForStudent,
    createQuizAttempt,
    completeQuizAttempt,
    getStudentAnswersForQuizAttempt,
    attemptFinalQuiz,
    checkIfQuizAttemptedAndPassed
};