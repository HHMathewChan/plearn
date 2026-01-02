/**
 * @fileoverview Course content service for business logic operations
 * This handles the course content service logic following the MVC pattern.
 */
const courseContentRepository = require('../repositories/courseContentRepository');
const courseRepository = require('../repositories/courseRepository');
const comprisesRepository = require('../repositories/comprisesRepository');
const { generateSignedCourseUrl } = require('../infrastructure/storage/r2Service');

/**
 * Get all course content for a specific course.
 * @async
 * @function getCourseContentByCourseId
 * @param {string} courseId - The unique identifier for the course
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of course content objects
 * @throws {Error} Throws an error if there's an issue fetching course content
 */
const getCourseContentByCourseId = async (courseId) => {
    try {
        console.log(`[getCourseContentByCourseId] Fetching content for course: "${courseId}"`);
        
        // First verify the course exists
        await courseRepository.getCourseById(courseId);
        
        // Then get the course content
        const courseContent = await courseContentRepository.getCourseContentByCourseId(courseId);
        
        return courseContent;
    } catch (error) {
        console.error(`[getCourseContentByCourseId] Error in service layer:`, error);
        throw error;
    }
};

/**
 * Get a specific course content item by its ID.
 * @async
 * @function getCourseContentById
 * @param {string} contentId - The unique identifier for the course content
 * @returns {Promise<Object>} A promise that resolves to the course content object
 * @throws {Error} Throws an error if there's an issue fetching course content
 */
const getCourseContentById = async (contentId) => {
    try {
        console.log(`[getCourseContentById] Fetching content with ID: "${contentId}"`);
        
        const courseContent = await courseContentRepository.getCourseContentById(contentId);
        
        return courseContent;
    } catch (error) {
        console.error(`[getCourseContentById] Error in service layer:`, error);
        throw error;
    }
};

/**
 * Get a course by content id
 * @param {string} contentId - The ID of the content item.
 * @returns {Promise<string|null>} - The course ID, or null if not found.
 */
const getCourseIdByContentId = async (contentId) => {
    try {
        console.log(`[getCourseIdByContentId] Fetching course ID for content: "${contentId}"`);
        // first get the content record
        const contentRecord = await courseContentRepository.getCourseContentById(contentId);
        if (!contentRecord) {
            return null;
        }
        const courseId = contentRecord.course_id;
        return courseId;
    } catch (error) {
        console.error(`[getCourseIdByContentId] Error in service layer:`, error);
        throw error;
    }
};

const getSignedContentUrl = async (contentId) => {
    try {
        console.log(`[getSignedContentUrl] Fetching signed URL for content ID: "${contentId}"`);
        
        const courseContent = await courseContentRepository.getCourseContentById(contentId);
        if (!courseContent) {
            throw new Error(`Course content not found with ID: ${contentId}`);
        }
        
        const contentUrl = courseContent.content_url;
        console.log(`[getSignedContentUrl] Retrieved content URL: "${contentUrl}"`);
        const signedUrl = await generateSignedCourseUrl(contentUrl);
        return signedUrl;
    } catch (error) {
        console.error(`[getSignedContentUrl] Error in service layer:`, error);
        throw error;
    }
}

module.exports = {
    getCourseContentByCourseId,
    getCourseContentById,
    getCourseIdByContentId,
    getSignedContentUrl
};