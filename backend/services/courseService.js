/**
 * This handles the course service logic.
 */
const courseRepository = require('../repositories/courseRepository');
const ownCourseByRepository = require('../repositories/ownCourseByRepository');
const copyRightOwnerRepository = require('../repositories/copyRightOwnerRepository');

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
 * @typedef {Object} CourseWithOwner
 * @property {string} id - The course ID
 * @property {string} course_code - The unique code for the course
 * @property {string} title - The course title
 * @property {string} description - The course description
 * @property {CopyrightOwner} copyrightOwner - The copyright owner information
 */

/**
 * Get the metadata of all courses. This includes the data from the Course and its copyright owner.
 * @async
 * @function getAllCoursesMetadata
 * @returns {Promise<Array<CourseWithOwner>>} A promise that resolves to an array of course objects, each enriched with copyright owner data.
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
        
        /**
         * @function enrichCourseWithOwner
         * Enrich a course with its copyright owner data.
         * @param {Object} course - The course object to enrich.
         * @returns {Promise<Object>} A promise that resolves to the enriched course object.
         */
        const enrichCourseWithOwner = async (course) => {
            const copyrightOwnerId = await ownCourseByRepository.getCopyrightOwnerByCourseId(course.id);
            const copyrightOwner = await copyRightOwnerRepository.getCopyrightOwnerById(copyrightOwnerId);
            return {
                // Spread the course data and add the copyright owner
                ...course,
                copyrightOwner // intentionally not using spread operator to avoid overwriting course properties
            };
        };

        const coursePromises = courses.map(enrichCourseWithOwner);
        // use Promise.all to resolve all promises concurrently
        const coursesWithOwners = await Promise.all(coursePromises);
        return coursesWithOwners;
    } catch (error) {
        console.error('Error fetching all courses metadata:', error);
        throw error;
    }
};

module.exports = {
    getAllCoursesMetadata
};