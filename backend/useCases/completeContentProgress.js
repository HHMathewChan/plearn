/**
 * @fileoverview This file is to handle the use case of completing content progress for a student.
 */

const hasContentProgressForRepository = require('../repositories/hasContentProgressForRepository');
const contentProgressRepository = require('../repositories/contentProgressRepository');
const courseContentService = require('../services/courseContentService');
const comprisesRepository = require('../repositories/comprisesRepository');
const contentProgressService = require('../services/contentProgressService');
const studentService = require('../services/studentService');

/**
 * Get the content progress id for a student and content.
 * @param {string} studentCode - The code identifying the student.
 * @param {string} contentId - The ID of the content item.
 */
async function getContentProgressIdForStudent(studentCode, contentId) {
    return hasContentProgressForRepository.getContentProgressId(studentCode, contentId);
}

/**
 * Mark a content progress record as completed and return the updated record.
 * @param {string} contentProgressId - The UUID of the content progress item.
 * @param {string} contentId - The ID of the content item.
 * @return {Promise<Object>} - The updated content progress record.
 */
async function markContentCompleted(contentProgressId, contentId) {
    // for debugging
    console.log("At completeContentProgress, markContentCompleted:", contentProgressId, contentId);
    const dateCompleted = new Date();
    const lastUpdated = new Date();
    return contentProgressRepository.updateContentProgress(
        contentProgressId,
        contentId,
        'completed',
        dateCompleted,
        lastUpdated
    );
}

/**
 * Resolve the course id that the given content belongs to.
 * @param {string} contentId - The ID of the content item.
 * @returns {Promise<string|null>} - The course ID, or null if not found.
 */
async function getCourseIdForContent(contentId) {
    // for debugging
    console.log("At completeContentProgress, getCourseIdForContent:", contentId);
    // delegate to courseContentService for mapping content -> course
    // service should provide a method that returns courseId for a contentId
    return courseContentService.getCourseIdByContentId(contentId);
}

/**
 * Determine whether all contents for a course are completed by the student.
 * @param {string} studentCode - The code identifying the student.
 * @param {string} contentId - The ID of the content item.
 * @returns {Promise<boolean>} - True if all contents are completed, false otherwise.
 */
async function areAllContentsCompleted(studentCode, contentId) {
    // for debugging
    console.log("At completeContentProgress, areAllContentsCompleted:", studentCode, contentId);
    // Get all content IDs for the course, this should be done by calling getAllCourseContentIDs for each contentId
    const contentIDs = await comprisesRepository.getAllCourseContentIDs(contentId);
    // Get all content progress records for the content IDs by calling getContentProgressByContentId on each contentID
    const contentProgressRecords = await Promise.all(contentIDs.map(id => contentProgressRepository.getContentProgressByContentId(id)));

    // Check if all content progress records have status 'completed'
    const completionChecks = contentProgressRecords.map(record => record.status === 'completed');
    const areAllCompleted = completionChecks.every(Boolean);
    // for debugging
    console.log("At completeContentProgress, areAllContentsCompleted, areAllCompleted:", areAllCompleted);
    return areAllCompleted;
}

/**
 * When all contents are completed, handle final quiz check and mark course completion.
 * @param {string} studentCode - The code identifying the student.
 * @param {string} courseId - The ID of the course.
 */
async function handleCourseCompletion(studentCode, courseId) {
    // for debugging
    console.log("At completeContentProgress, handleCourseCompletion:", studentCode, courseId);
    const isFinalQuizCompleted = await studentService.checkFinalQuizCompletion(studentCode, courseId);
    if (isFinalQuizCompleted) {
        await studentService.completeCourse(studentCode, courseId);
        return true;
    }
    return false;
}

/**
 *  The whole usecase when student complete a course content, including checking if all other contents are completed
 * @param {string} studentCode - The code identifying the student.
 * @param {string} contentId - The ID of the content item.
 * @returns {Promise<Object|null>, areAllCompleted: boolean}>} - An object containing the updated content progress record (or null if not found) and a boolean indicating if all contents are completed.

 */
async function completeContentProgressUseCase(studentCode, contentId) {
    // for debugging
    console.log("At completeContentProgress, completeContentProgressUseCase:", studentCode, contentId);
    // Get the content progress id for the student and content
    const contentProgressId = await getContentProgressIdForStudent(studentCode, contentId);
    if (!contentProgressId) {
        return { contentProgress: null, isAllCompleted: false };
    }
    // Mark the content as completed
    let updatedContentProgress = await markContentCompleted(contentProgressId, contentId);
    // In case it returns raw db result, take the first element
    if (Array.isArray(updatedContentProgress)) {
        updatedContentProgress = updatedContentProgress[0];
    }
    // Get the course ID for the content
    const courseId = await getCourseIdForContent(contentId);
    // Check if all contents for the course are completed
    const areAllCompleted = await areAllContentsCompleted(studentCode, contentId);

    if (areAllCompleted) {
        await handleCourseCompletion(studentCode, courseId);
    }
    const result = { updatedContentProgress, areAllCompleted };
    return result;
}

module.exports = { completeContentProgressUseCase };