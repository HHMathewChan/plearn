const studentRepository = require('../repositories/studentRepository');
const platformUserRepository = require('../repositories/platformUserRepository');
const hasStudentProfileInRepository = require('../repositories/hasStudentProfileInRepository');
const logPastAttemptForStudentAtRepository = require('../repositories/logPastAttemptForStudentAtRepository');
const quizAttemptService = require('./quizAttemptService');
const courseProgressService = require('./courseProgressService');
const studentLearningPerferenceService = require('./studentLearningPerferenceService');
const courseService = require('./courseService');


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

/**
 * Getting all required information for recommendations of a student
 */
const getStudentProfileForRecommendations = async (studentCode) => {
  const learningPreference = await studentLearningPerferenceService.getLearningPreferenceOfStudent(studentCode);
  // for debugging
  console.log('At studentService, getStudentProfileForRecommendations, Fetched learning preferences for student:', learningPreference);
  // Get all completed courses for the student
  const completedCourses = await courseProgressService.getCompletedCoursesForStudent(studentCode);
  // for each completed course, we find its final quiz id and to get the score
  const completedCoursesWithScores = [];
  // example of completedCoursesWithScores: [{ "courseId": "CRS1", "finalScore": 88, "completedAt": "2025-06-05T09:00:00Z" }]
  const finalQuizResults = [];
  // example of finalQuizResults: [{ "finalQuizId": 1, "finalScore": 88,"attemptCount": 2, "completedAt": "2025-06-05T09:00:00Z" }]
  for (const courseProgress of completedCourses) {
    const courseId = courseProgress.course_id;
    // ask course service to get the final quiz id for the course
    const finalQuizId = await courseService.getFinalQuizId(courseId);
    if (finalQuizId) {
      // find all quiz attempts for the student for the final quiz
      const quizAttemptsWithFinalQuizID = await quizAttemptService.getPastQuizAttemptsForStudent(studentCode, finalQuizId);
      for (const { finalQuizID, quizAttempt } of quizAttemptsWithFinalQuizID) {
        // Push each attempt with the courseid, score and completedAt to the result array
        completedCoursesWithScores.push({
          courseId: courseId,
          finalScore: quizAttempt.score,
          completedAt: quizAttempt.completed_at
        });
        // also push a final quiz result
        finalQuizResults.push({
          finalQuizId: finalQuizID,
          finalScore: quizAttempt.score,
          attemptCount: quizAttempt.attempt_count,
          completedAt: quizAttempt.completed_at
        });
      }
    }
  }
  return {
    learningPreference,
    completedCoursesWithScores,
    finalQuizResults
  };
};

module.exports = {
  getAllStudents,
  checkFinalQuizCompletion,
  completeCourse,
  getStudentProfileForRecommendations
};