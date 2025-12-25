/**
 * @fileoverview This file is to manage enrolment operations.
 */
const enrolmentService = require('../services/enrolmentService');
const { sanitiseText } = require('../validation/textSanitiser');

/**
 * handlers for the enrols function
 * assign the parameter needed from request body to variable
 * @param {object} request - The request object containing the enrolment data.
 * @param {object} response - The response object to send the result.
 * @returns {Promise<void>} A promise that resolves when the enrolment is created.
 * @propperty {string} enrolmentResponse.id - The unique identifier for the enrolment.
 * @propperty {string} enrolmentResponse.enrolment_code - The unique code for the enrolment.
 */
const enrols = async (request, response) => {
  // for debugging purpose
  console.log("enrols called");
  console.log("Raw request body:", request.body);

  try {
    const { student_code, course_id } = request.body;
    
    // Sanitise the input strings
    const sanitisedStudentCode = sanitiseText(student_code || '');
    const sanitisedCourseId = sanitiseText(course_id || '');
    
    const enrolmentResponse = await enrolmentService.enrols({
      student_code: sanitisedStudentCode,
      course_id: sanitisedCourseId
    });
    response.status(201).json(enrolmentResponse);
  } catch (error) {
    console.log("Error details:", error.message);
    response.status(500).json({ error: error.message });
  }
};

/**
 * handlers for the enrolmentUsecase function
 * @param {object} request - The request object containing the enrolment data.
 * @param {object} response - The response object to send the result.
 * @returns {Promise<void>} A promise that resolves when the enrolment is created. contain A promise that resolves to an object containing the enrolment and course progress if success
 * @property {object} enrolment - The enrolment object containing its id and enrolment_code.
 * @property {object} courseProgress - The course progress object containing its id and progress details.
 */
const enrolmentUsecase = async (request, response) => {
  // for debugging purpose
  console.log("enrolmentUsecase called");
  console.log("Raw request body:", request.body);

  try {
    const { student_code, course_id } = request.body;
    
    // Sanitise the input strings
    const sanitisedStudentCode = sanitiseText(student_code || '');
    const sanitisedCourseId = sanitiseText(course_id || '');

    const Response = await enrolmentService.enrolmentUsecase({
      student_code: sanitisedStudentCode,
      course_id: sanitisedCourseId
    });
    response.status(201).json(Response);
  } catch (error) {
    console.log("Error details:", error.message);
    response.status(500).json({ error: error.message });
  }
};

/**
 * Get all enrolled courses for a student.
 * @function getEnrolledCoursesByStudentCode
 * @param {object} request - The request object containing the student_code.
 * @param {object} response - The response object to send the result.
 * @returns {Promise<void>} A promise that resolves when the courses are fetched.
 * @throws {Error} Throws an error if there's a database connection or query issue.
 * @property {Array<object>} courses - An array of course objects.
 * @property {string} course.id - The unique identifier for the course.
 * @property {string} course.course_code - The unique code for the course.
 * @property {string} course.title - The title of the course.
 * @property {string} course.description - A brief description of the course.
 */
const getEnrolledCoursesByStudentCode = async (request, response) => {
  //for debugging purpose
  console.log("getEnrolledCoursesByStudentCode called");
  console.log("Raw request params:", request.params);

  try {
    const { studentCode } = request.params;
    
    // Sanitise the input string
    const sanitisedStudentCode = sanitiseText(studentCode || '');

    //for debugging purpose
    console.log("Sanitised student_code:", sanitisedStudentCode);
    
    const courses = await enrolmentService.getEnrolledCoursesByStudentCode(sanitisedStudentCode);
    response.status(200).json(courses);
  } catch (error) {
    console.log("Error details:", error.message);
    response.status(500).json({ error: error.message });
  }
};

module.exports = {
  enrols,
  getEnrolledCoursesByStudentCode,
  enrolmentUsecase
};