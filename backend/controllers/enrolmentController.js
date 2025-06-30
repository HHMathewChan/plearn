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

module.exports = {
  enrols
};