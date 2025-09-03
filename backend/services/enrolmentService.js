/**
 * @fileoverview This file handles the enrolment service logic.
 */
const enrolmentRepository = require('../repositories/enrolmentRepository');
const enrolsInRepository = require('../repositories/enrolsInRepository');
const hasCourseReferenceToRepository = require('../repositories/hasCourseReferenceToRepository');
const courseRepository = require('../repositories/courseRepository');
const courseProgressService = require('./courseProgressService');

/**
 * A student enroled in a course.
 * @param {object} enrolmentData - The enrolment object containing student_code and course_id.
 * @returns {Promise<object>} The created enrolment object containing its id and enrolment_code.
 * @propperty {string} enrolmentResponse.id - The unique identifier for the enrolment.
 * @propperty {string} enrolmentResponse.enrolment_code - The unique code for
 */
const enrols = async (enrolmentData) => {
    const { student_code, course_id } = enrolmentData;
    
    console.log(`[enrolmentService, enrols] Processing enrolment for student_code: "${student_code}", course_id: "${course_id}"`);
    
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

/**
 * Get all enrolled courses and its corresponding progress for a student.
 * @function getEnrolledCoursesByStudentCode
 * @param {string} student_code - The unique identifier for the student.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of course objects the student is enrolled in.
 * @throws {Error} Throws an error if there's a database connection or query issue.
 * @property {Array<object>} courses - An array of course objects.
 * @property {Array<object>} courseProgress - An array of course progress objects.
 */
const getEnrolledCoursesByStudentCode = async (student_code) => {
    try {
        console.log(`[getEnrolledCoursesByStudentCode] Fetching enrolment IDs for student_code: "${student_code}"`);
        
        // Get all enrolment IDs for the student
        const enrolmentIds = await enrolsInRepository.getEnrolmentIdsByStudentCode(student_code);
        
        if (enrolmentIds.length === 0) {
            console.log(`[getEnrolledCoursesByStudentCode] No enrolments found for student_code: "${student_code}"`);
            return [];
        }
        
        console.log(`[getEnrolledCoursesByStudentCode] Found enrolment IDs:`, enrolmentIds);
        
        // Fetch course details for each enrolment ID
        const courses = await Promise.all(enrolmentIds.map(async (enrolmentId) => {
            //First get the enrolment record to extract the course_id
            const enrolmentRecord = await enrolmentRepository.getEnrolmentById(enrolmentId);
            // Then get the course details using the course_id
            const course = await courseRepository.getCourseById(enrolmentRecord.course_id);
            const courseProgress = await courseProgressService.getCourseProgressUseCase(student_code, enrolmentRecord.course_id);
            const enroledCourseWithMetaData = {
                course,
                courseProgress
            };
            return enroledCourseWithMetaData;
        }));
        
        console.log(`[getEnrolledCoursesByStudentCode] Successfully fetched courses for student_code: "${student_code}"`);
        return courses;
    } catch (error) {
        console.error(`[getEnrolledCoursesByStudentCode] Error fetching enrolled courses for student_code: "${student_code}"`);
        console.error(`[getEnrolledCoursesByStudentCode] Full error details:`, error);
        throw error;
    }
};

/**
 * The whole enrolment use case of a student.
 * This includes enrolling the student in a course and creating their course progress.
 * @param {object} enrolmentData - The enrolment object containing student_code and course_id.
 * @returns {Promise<object>} A promise that resolves to an object containing the enrolment and course progress.
 */
const enrolmentUsecase = async (enrolmentData) => {
    const { student_code, course_id } = enrolmentData;
    console.log(`[enrolmentUsecase] Called with student_code: "${student_code}", course_id: "${course_id}"`);
    try {
        // Enrol the student in the course
        const enrolment = await enrols(enrolmentData);
        console.log(`[enrolmentUsecase] Successfully enrolled student: "${student_code}" in course: "${course_id}"`);
        // Create course progress for the student
        const courseProgress = await courseProgressService.createCourseProgressUseCase(student_code, course_id);
        return { enrolment, courseProgress };
    } catch (error) {
        console.error(`[enrolmentUsecase] Error during enrolment process for student: "${student_code}", course: "${course_id}"`);
        console.error(`[enrolmentUsecase] Full error details:`, error);
        throw error;
    }
}

module.exports = {
    enrols,
    getEnrolledCoursesByStudentCode,
    enrolmentUsecase
};