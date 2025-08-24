const quizAttemptRepository = require('../repositories/quizAttemptRepository');
const studentAnswerRepository = require('../repositories/studentAnswerRepository');
const logAnswerForOptionWithRepository = require('../repositories/logAnswerForOptionWithRepository');
const logActiveAttemptForFinalQuizWithRepository = require('../repositories/logActiveAttemptForFinalQuizWithRepository');
const logActiveAttemptForStudentAtRepository = require('../repositories/logActiveAttemptForStudentAtRepository');
const logAnswerForAttemptWithRepository = require('../repositories/logAnswerForAttemptWithRepository.js');
const logPastAttemptForFinalQuizWithRepository = require('../repositories/logPastAttemptForFinalQuizWithRepository');
const logPastAttemptForStudentAtRepository = require('../repositories/logPastAttemptForStudentAtRepository');

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
 */
const createQuizAttempt = async (studentCode, finalQuizId) => {
    // for debugging
    console.log('At quizAttemptService, Creating quiz attempt for:', { studentCode, finalQuizId });
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
    const completedAt = new Date();
    const attemptStatus = 'completed';
    const updatedAt = new Date();
    // set score to 90 for tesing
    const score = 90;
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
    completeQuizAttempt
};