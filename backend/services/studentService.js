const studentRepository = require('../repositories/studentRepository');
const platformUserRepository = require('../repositories/platformUserRepository');
const hasStudentProfileInRepository = require('../repositories/hasStudentProfileInRepository');
const logPastAttemptForStudentAtRepository = require('../repositories/logPastAttemptForStudentAtRepository');
const quizAttemptService = require('./quizAttemptService');
const courseProgressService = require('./courseProgressService');

const getAllStudents = async () => {
  return await studentRepository.queryAllStudents();
};

/**
 * Check if the final quiz is completed for the student
 * @param {*} studentCode 
 * @param {*} courseId 
 * @returns {Promise<boolean>} True if the final quiz is completed, false otherwise.
 */
const checkFinalQuizCompletion = async (studentCode, courseId) => {
  // for debugging
  console.log('At studentService, checkFinalQuizCompletion, Checking final quiz completion for student:', studentCode);
  // Check if the final quiz is completed for the student
  // First, find all pass quiz attempts for the student in the course
  const passAttemptLinks = await logPastAttemptForStudentAtRepository.getAllPastAttemptsForStudent(studentCode);
  // for debugging
  console.log('At studentService, checkFinalQuizCompletion, Fetched past attempt links for student:', passAttemptLinks);
  const passAttemptIds = passAttemptLinks.map(link => link.quiz_attempt_id);
  //for debugging
  console.log('At studentService, checkFinalQuizCompletion, Fetched past attempt IDs for student:', passAttemptIds);
  // Ask the quiz attempt service to filter out the attempts that are for quizzes in the course and are passed
  const isCompleted = await quizAttemptService.checkIfQuizAttemptedAndPassed(passAttemptIds, courseId);
  return isCompleted;
};

/**
 * Complete a course progress
 * @param {*} studentCode
 * @param {*} courseId
 * @returns {Promise<void>}
 */
const completeCourse = async (studentCode, courseId) => {
  // for debugging
  console.log('At studentService, completeCourse, Completing course progress for student:', studentCode);
  // Call the course progress service to complete the course progress
  const result = await courseProgressService.completeCourseProgressUseCase(studentCode, courseId);
  console.log('At studentService, completeCourse, Course progress completion result:', result);
  return result;
};

module.exports = {
  getAllStudents,
  checkFinalQuizCompletion,
  completeCourse
};