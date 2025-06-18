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
        console.log(`[createEnrolsIn] Attempting to create enrolsIn record with student_code: "${student_code}", enrolment_id: "${enrolment_id}"`);
        console.log(`[createEnrolsIn] Student code details - Length: ${student_code?.length}, Type: ${typeof student_code}, Value: ${JSON.stringify(student_code)}`);
        
        const result = await database.none(
            `INSERT INTO enrolsIn 
            (student_code, enrolment_id)
            VALUES 
            ($1, $2)`,
            [student_code, enrolment_id]
        );
        
        console.log(`[createEnrolsIn] Successfully created enrolsIn record`);
        return result;
    } catch (error) {
        console.error(`[createEnrolsIn] Error creating enrolsIn record for student_code: "${student_code}", enrolment_id: "${enrolment_id}"`);
        console.error(`[createEnrolsIn] Student code validation details:`);
        console.error(`  - Value: ${JSON.stringify(student_code)}`);
        console.error(`  - Type: ${typeof student_code}`);
        console.error(`  - Length: ${student_code?.length}`);
        console.error(`  - Is null/undefined: ${student_code == null}`);
        console.error(`  - Is empty string: ${student_code === ''}`);
        console.error(`  - Trimmed value: "${student_code?.trim()}"`);
        
        if (error.message && error.message.includes('studentcode_check')) {
            console.error(`[createEnrolsIn] CONSTRAINT VIOLATION: The student_code "${student_code}" violates the studentcode_check constraint`);
            console.error(`[createEnrolsIn] This typically means the student_code format is invalid. Check your database constraint definition.`);
        }
        
        console.error(`[createEnrolsIn] Full error details:`, error);
        throw error;
    }
};

module.exports = {
    createEnrolsIn
};