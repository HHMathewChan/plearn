/**
 * @fileoverview Course repository for database operations
 */
const database = require('../database');

/**
 * @typedef {Object} Course
 * @property {number} id - The unique identifier for the course.
 * @property {string} course_code - The unique code for the course.
 * @property {string} title - The title of the course.
 * @property {string} description - A brief description of the course.
 */

/**
 * Get all courses from the database.
 * @returns {Promise<Array<Course>>} - A promise that resolves to an array of course objects.
 * @see {@link Course}
 * @throws {Error} - If there is an error fetching the courses.
 */
async function getAllCourses() {
  try {
    // Use .any() since 0 or more courses are expected
    const courses = await database.any('SELECT * FROM course');
    return courses;
  } catch (error) {
    console.error('Database query failed:', error);
    throw new Error(`Error fetching courses: ${error.message}`);
  }
}

/**
 * Get a specific course by its ID.
 * @function getCourseById
 * @param {string} courseId - The unique identifier for the course (UUID)
 * @returns {Promise<Course>} A promise that resolves to the course object
 * @throws {Error} Throws an error if no course is found with the given ID
 * @see {@link Course}
 */
async function getCourseById(courseId) {
  try {
    console.log(`[getCourseById] Querying course with ID: "${courseId}"`);
    
    // Use .one() since exactly one course is expected
    const course = await database.one(
      'SELECT * FROM course WHERE id = $1',
      [courseId]
    );
    
    console.log(`[getCourseById] Successfully found course:`, course);
    return course;
  } catch (error) {
    console.error(`[getCourseById] Error fetching course with ID: "${courseId}"`);
    
    if (error.message === 'No data returned from the query.') {
      console.error(`[getCourseById] No course found with ID: "${courseId}"`);
      throw new Error(`Course not found with ID: ${courseId}`);
    }
    
    console.error(`[getCourseById] Full error details:`, error);
    throw new Error(`Error fetching course: ${error.message}`);
  }
}

module.exports = {
  getAllCourses,
  getCourseById, 
};