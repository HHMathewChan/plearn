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
    console.log('Attempting to query courses table...');
    const courses = await database.query('SELECT * FROM course');
    console.log('Query successful, found', courses.length, 'courses');
    return courses;
  } catch (error) {
    console.error('Database query failed:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      detail: error.detail,
      hint: error.hint,
      position: error.position
    });
    throw new Error(`Error fetching courses: ${error.message}`);
  }
}

module.exports = {
  getAllCourses,
};