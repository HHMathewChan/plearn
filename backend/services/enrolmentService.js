/**
 * @fileoverview This file handles the enrolment service logic.
 */
const enrolmentRepository = require('../repositories/enrolmentRepository');
const enrolsInRepository = require('../repositories/enrolsInRepository');
const hasCourseReferenceToRepository = require('../repositories/hasCourseReferenceToRepository');

/**
 * A student enroled in a course.
 * @param {object} enrolmentData - The enrolment object containing student_code and course_id.
 * @returns {Promise<object>} The created enrolment object containing its id and enrolment_code.
 * @propperty {string} enrolmentResponse.id - The unique identifier for the enrolment.
 * @propperty {string} enrolmentResponse.enrolment_code - The unique code for
 */
const studentEnrolsCourse = async (enrolmentData) => {
    const { student_code, course_id } = enrolmentData;
    
    console.log(`[studentEnrolsCourse] Processing enrolment for student_code: "${student_code}", course_id: "${course_id}"`);
    
    // Create a new enrolment record, assign the returned id and enrolment_code to the enrolment object
    const enrolmentResponse = await enrolmentRepository.createEnrolment(student_code, course_id);
    
    // Create a new record in the enrolsIn table to link the STUDENT with the ENROLMENT
    // Note: Pass student_code and enrolment_id (not enrolment_code)
    await enrolsInRepository.createEnrolsIn(student_code, enrolmentResponse.id);
    
    // Create a new record in the hasCourseReferenceTo table to link the enrolment with the course
    await hasCourseReferenceToRepository.createHasCourseReferenceTo(enrolmentResponse.id, course_id);

    // Return the enrolment object
    return {
        id: enrolmentResponse.id,
        enrolment_code: enrolmentResponse.enrolment_code
    };
};

module.exports = {
    studentEnrolsCourse
};