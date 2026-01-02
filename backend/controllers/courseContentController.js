/**
 * @fileoverview Course content controller for handling HTTP requests
 * This file manages course content operations following the MVC pattern.
 * It includes functions to get course content by course ID and individual content items.
 */
const courseContentService = require('../services/courseContentService');
const { sanitiseText } = require('../validation/textSanitiser');
const { generateSignedCourseUrl } = require('../infrastructure/storage/r2Service');

/**
 * Get all course content for a specific course.
 * @async
 * @function getCourseContentByCourseId
 * @param {Object} request - Express request object with courseId parameter
 * @returns {Promise<void>}
 */
const getCourseContentByCourseId = async (request, response) => {
    try {
        const { courseId } = request.params;
        
        // Sanitise the input
        const sanitisedCourseId = sanitiseText(courseId || '');
        
        const courseContent = await courseContentService.getCourseContentByCourseId(sanitisedCourseId);
        response.json({ courseContent });
    } catch (error) {
        console.error('CourseContentController error:', error);
        response.status(500).json({
            error: 'Internal server error',
            message: `Error fetching course content: ${error.message}`
        });
    }
};

/**
 * Get a specific course content item by its ID.
 * @async
 * @function getCourseContentById
 * @param {Object} request - Express request object with contentId parameter
 * @returns {Promise<void>}
 */
const getCourseContentById = async (request, response) => {
    try {
        const { contentId } = request.params;
        
        // Sanitise the input
        const sanitisedContentId = sanitiseText(contentId || '');
        
        const courseContent = await courseContentService.getCourseContentById(sanitisedContentId);
        response.json(courseContent);
    } catch (error) {
        console.error('CourseContentController error:', error);
        response.status(500).json({
            error: 'Internal server error',
            message: `Error fetching course content: ${error.message}`
        });
    }
};

/**
 * 
* Get a signed URL for accessing course material.
* @async
* @function getCourseMaterialUrl
* @param {Object} request - Express request object with contentUrl parameter
* @returns {Promise<void>} - A promise that resolves to the signed URL
*/
const getCourseMaterialUrl = async (request, response) => {
    // for debugging purpose
    console.log("getCourseMaterialUrl called");
    console.log("Raw request params:", request.params);
    const {contentUrl} = request.params;
    console.log("Extracted contentUrl:", contentUrl);
    const joinedContentUrl = Array.isArray(contentUrl) ? contentUrl.join('/') : contentUrl;
    console.log("Constructed contentPath:", joinedContentUrl);

    try {
    const signedUrl = await generateSignedCourseUrl(joinedContentUrl);
    response.json({ signedUrl });
    } 
    catch (error) {
    console.error('R2 fetch error:', error);
    response.status(500).json({ error: 'Failed to get course material' });
    }
}

module.exports = {
    getCourseContentByCourseId,
    getCourseContentById,
    getCourseMaterialUrl
};