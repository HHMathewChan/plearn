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

/**
 * Get all enrolment IDs for a specific student.
 * @function getEnrolmentIdsByStudentCode
 * @param {string} student_code - The unique identifier for the student.
 * @returns {Promise<Array<string>>} A promise that resolves to an array of enrolment IDs.
 * @throws {Error} Throws an error if there's a database connection or query issue.
 */
const getEnrolmentIdsByStudentCode = async (student_code) => {
    try {
        console.log(`[getEnrolmentIdsByStudentCode] Querying enrolments for student_code: "${student_code}"`);
        
        // Use .any() since 0 or more enrolments are expected for a student
        const result = await database.any(
            'SELECT enrolment_id FROM enrolsIn WHERE student_code = $1',
            [student_code]
        );

        // Extract just the enrolment_id values from the result objects by calling an arrow function named row which returns the enrolment_id.
        const enrolmentIds = result.map(row => row.enrolment_id);
        
        console.log(`[getEnrolmentIdsByStudentCode] Found ${enrolmentIds.length} enrolment(s) for student_code: "${student_code}"`);
        return enrolmentIds;
    } catch (error) {
        console.error(`[getEnrolmentIdsByStudentCode] Error fetching enrolments for student_code: "${student_code}"`);
        console.error(`[getEnrolmentIdsByStudentCode] Full error details:`, error);
        throw new Error(`Error fetching enrolments for student: ${error.message}`);
    }
};

module.exports = {
    createEnrolsIn,
    getEnrolmentIdsByStudentCode
};