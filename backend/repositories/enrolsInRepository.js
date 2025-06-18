/**
 * @fileoverview This file provides functions to interact with the enrolsIn table in the database.
 */
const database = require('../database');
/**
 * Create a new record in the enrolsIn table.
 * @function createEnrolsIn
 * @param {string} student_code - The unique identifier for the student.
 * @param {string} enrolment_id - The unique identifier for the enrolment.
 */
const createEnrolsIn = async (student_code, enrolment_id) => {
    try {
        return database.none(
            `INSERT INTO enrolsIn 
            (student_code, enrolment_id)
            VALUES 
            ($1, $2)`,
            [student_code, enrolment_id]
        );
    } catch (error) {
        console.error('Error creating enrolsIn record:', error);
        throw error;
    }
};

module.exports = {
    createEnrolsIn
};