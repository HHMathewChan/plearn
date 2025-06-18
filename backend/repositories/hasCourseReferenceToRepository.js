/**
 * @fileoverview This file provides functions to interact with the hasCourseReference table in the database.
 */
const database = require('../database');

/**
 * Create a new record in the hasCourseReference table.
 * @function createHasCourseReferenceTo
 * @param {string} enrolment_id - The unique identifier for the enrolment.
 * @param {string} course_id - The unique identifier for the course.
 * @returns {Promise<void>} A promise that resolves when the record is created.
 */
const createHasCourseReferenceTo = async (enrolment_id, course_id) => {
    try {
        await database.none(
            `INSERT INTO hasCourseReferenceTo (enrolment_id, course_id)
            VALUES ($1, $2)`,
            [enrolment_id, course_id]
        );
    } catch (error) {
        console.error('Error creating hasCourseReferenceTo record:', error);
        throw error;
    }
};

module.exports = {
    createHasCourseReferenceTo
};