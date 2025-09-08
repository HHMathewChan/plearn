/**
 * This handles the course service logic.
 */
const courseRepository = require('../repositories/courseRepository');
const ownCourseByRepository = require('../repositories/ownCourseByRepository');
const copyRightOwnerRepository = require('../repositories/copyRightOwnerRepository');
const hasFinalQuizForRepository = require('../repositories/hasFinalQuizForRepository');
const labelCourseWithRepository = require('../repositories/labelCourseWithRepository');
const topicRepository = require('../repositories/topicRepository');

/**
 * @typedef {Object} CopyrightOwner
 * @property {number} id - The unique identifier for the copyright owner.
 * @property {string} name - The name of the copyright owner.
 * @property {string} type - The type of the copyright owner (e.g., individual, organization).
 * @property {string} contact_email - The contact email of the copyright owner.
 * @property {string} license_type - The type of license associated with the copyright owner.
 * @property {string} license_url - The URL to the license information.
 */

/**
 * @typedef {Object} CourseWithMetadata
 * @property {string} id - The course ID
 * @property {string} course_code - The unique code for the course
 * @property {string} title - The course title
 * @property {string} description - The course description
 * @property {CopyrightOwner} copyrightOwner - The copyright owner information
 * @property {Object} topic - The topic information
 */

/**
 * Get the metadata of all courses. This includes the data from the Course and its copyright owner.
 * @async
 * @function getAllCoursesMetadata
 * @returns {Promise<Array<CourseWithMetadata>>} A promise that resolves to an array of course objects, each enriched with copyright owner data.
 * @throws {Error} Throws an error if there's an issue fetching courses, copyright owner relationships, or copyright owner data.
 * @example
 * // Get all courses with their copyright owners
 * const coursesWithOwners = await getAllCoursesMetadata();
 * console.log(coursesWithOwners[0].copyrightOwner); // Access copyright owner data
 */
const getAllCoursesMetadata = async () => {
    try {
        // Get all courses
        const courses = await courseRepository.getAllCourses();
        // for debugging
        console.log('At courseService, getAllCoursesMetadata, Fetched courses:', courses);
        
        /**
         * @function enrichCourseData
         * Enrich a course with its copyright owner data.
         * @param {Object} course - The course object to enrich.
         * @returns {Promise<Object>} A promise that resolves to the enriched course object.
         */
        const enrichCourseData = async (course) => {
            const copyrightOwnerId = await ownCourseByRepository.getCopyrightOwnerByCourseId(course.id);
            if (!copyrightOwnerId) {
                return { "no copyrightOwnerId is found": course.id };
            }
            const copyrightOwner = await copyRightOwnerRepository.getCopyrightOwnerById(copyrightOwnerId);
            if (!copyrightOwner) {
                return { "no copyrightOwner is found": course.id };
            }
            // Get the topic ID for the course
            const topicId = await labelCourseWithRepository.getTopicIdByCourseId(course.id);
            if (!topicId) {
                return { "no topicId is found": course.id };
            }
            // Get the topic
            const topic = await topicRepository.getTopicById(topicId);
            if (!topic) {
                return { "no topic is found": course.id };
            }
            // for debugging
            console.log('At courseService, getAllCoursesMetadata, Enriched course data:', {
                ...course,
                topic,
                copyrightOwner
            });
            return {
                // Spread the course data and add the copyright owner
                ...course,
                topic,
                copyrightOwner // intentionally not using spread operator to avoid overwriting course properties
            };
        };

        const coursePromises = courses.map(enrichCourseData);
        // use Promise.all to resolve all promises concurrently
        const coursesWithOwners = await Promise.all(coursePromises);
        return coursesWithOwners;
    } catch (error) {
        console.error('Error fetching all courses metadata:', error);
        throw error;
    }
};
/**
 * get the final quiz id
 * @param {string} courseId - The ID of the course.
 * @returns {Promise<string|null>} - The ID of the final quiz, or null if not found.
 */
const getFinalQuizId = async (courseId) => {
    try {
        // for debugging
        console.log('At courseService, getFinalQuizId, Fetching final quiz ID for course:', courseId);
        const finalQuizID = await hasFinalQuizForRepository.getFinalQuizIdForCourse(courseId);
        // for debugging
        console.log('At courseService, getFinalQuizId, Fetched final quiz ID for course:', finalQuizID);
        return finalQuizID ? finalQuizID : null;
    } catch (error) {
        console.error('Error fetching final quiz ID:', error);
        throw error;
    }
};

/**
 * Get the topics id associated with a course
 * @param {string} courseId - The ID of the course
 * @returns {Promise<Array<string>>} - An array of topic IDs associated with the course
 */

const getCourseTopicIDs = async (courseId) => {
    try {
        // for debugging
        console.log('At courseService, getCourseTopics, Fetching topic IDs for course:', courseId);
        const topicIDs = await labelCourseWithRepository.getTopicIdByCourseId(courseId);
        // for debugging
        console.log('At courseService, getCourseTopics, Fetched topic IDs for course:', topicIDs);
        return topicIDs;
    } catch (error) {
        console.error('Error fetching topic IDs:', error);
        throw error;
    }
};

module.exports = {
    getAllCoursesMetadata,
    getFinalQuizId,
    getCourseTopicIDs
};