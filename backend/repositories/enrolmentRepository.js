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
        console.log(`[createEnrolment] Attempting to create enrolment with student_code: "${student_code}", course_id: "${course_id}"`);
        console.log(`[createEnrolment] Student code details - Length: ${student_code?.length}, Type: ${typeof student_code}, Value: ${JSON.stringify(student_code)}`);
        
        const result = await database.one(
            `INSERT INTO enrolment 
            (id, enrolment_code, student_code, course_id, enrolled_at) 
            VALUES 
            (DEFAULT, DEFAULT, $1, $2, DEFAULT) 
            RETURNING id, enrolment_code`,
            [student_code, course_id]
        );
        
        console.log(`[createEnrolment] Successfully created enrolment:`, result);
        return result;
    } catch (error) {
        console.error(`[createEnrolment] Error creating enrolment for student_code: "${student_code}", course_id: "${course_id}"`);
        console.error(`[createEnrolment] Student code validation details:`);
        console.error(`  - Value: ${JSON.stringify(student_code)}`);
        console.error(`  - Type: ${typeof student_code}`);
        console.error(`  - Length: ${student_code?.length}`);
        console.error(`  - Is null/undefined: ${student_code == null}`);
        console.error(`  - Is empty string: ${student_code === ''}`);
        console.error(`  - Trimmed value: "${student_code?.trim()}"`);
        
        if (error.message && error.message.includes('studentcode_check')) {
            console.error(`[createEnrolment] CONSTRAINT VIOLATION: The student_code "${student_code}" violates the studentcode_check constraint`);
            console.error(`[createEnrolment] This typically means the student_code format is invalid. Check your database constraint definition.`);
        }
        
        console.error(`[createEnrolment] Full error details:`, error);
        throw error;
    }
}

module.exports = {
    createEnrolment
};