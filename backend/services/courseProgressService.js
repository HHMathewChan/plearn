const logCourseProgressAtRepository = require ('../repositories/logCourseProgressAtRepository.js');
const courseProgressRepository = require ('../repositories/courseProgressRepository.js');
const hasCourseProgressForRepository = require ('../repositories/hasCourseProgressForRepository.js');

/**
 * Create the course progress for a student
 * @param {string} studentCode - The code of the student
 * @param {number} courseId - The ID of the course
 */
async function createCourseProgressUseCase(studentCode, courseId) {
    // Default values for a new course progress
    const status = 'in_progress';
    const date_completed = null;
    const last_updated = new Date();

    const courseProgress = await courseProgressRepository.createRecord(studentCode, courseId, status, date_completed, last_updated);
    await hasCourseProgressForRepository.createRecord(courseProgress.id, studentCode);
    await logCourseProgressAtRepository.createRecord(courseId, courseProgress.id);
    return courseProgress;
}

module.exports = {
    createCourseProgressUseCase
};