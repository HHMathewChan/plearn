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

module.exports = {
  getAllCourses,
};