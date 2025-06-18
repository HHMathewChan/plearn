/**
 * @ fileoverview: This file provides functions to interact with the enrolment table in the database.
 */
const database = require('../database');

/**
 * Create a new enrolment record.
 * @function createEnrolment
 * @param {string} student_code - The unique identifier for the student
 * @param {string} course_id - The unique identifier for the course
 * @returns {Promise<Object>} A promise that resolves to the created enrolment object.
 * @property {string} enrolment_code - The unique identifier for the enrolment (UUID).
 */
const createEnrolment = async (student_code, course_id) => {
    try {
        const result = await database.one(
            `INSERT INTO enrolment 
            (id, enrolment_code, student_code, course_id, enrolled_at) 
            VALUES 
            (DEFAULT, DEFAULT, $1, $2, DEFAULT) 
            RETURNING id, enrolment_code`,
            [student_code, course_id]
        );
        return result;
    } catch (error) {
        console.error('Error creating enrolment:', error);
        throw error;
    }
}

module.exports = {
    createEnrolment
};