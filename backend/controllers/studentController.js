const studentService = require('../services/studentService');
const {validateName} = require('../utilities/sanitize');

const getAllStudents = async (request, response) => {
  try {
    const students = await studentService.getAllStudents();
    response.json(students);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

/**
 * handlers for the registerStudent function 
 * assign the parameter needed from request body to variable
 */
const registerStudent = async (request, response) => {
  // for debugging purpose
  console.log("registerStudent called");
  console.log("Raw request body:", request.body);
  
  try {
    const { name, email, password, role } = request.body;
    
    // Validate and sanitize name
    const cleanName = validateName(name);
    // console.log("Original name:", JSON.stringify(name));
    // console.log("Cleaned name:", JSON.stringify(cleanName));
    
    const student = await studentService.registerStudent({
      name: cleanName,
      email,
      password,
      role
    });
    response.status(201).json({ student_code: student });
  } catch (error) {
    console.log("Error details:", error.message);
    response.status(500).json({ error: error.message });
  }
}

/**
 * handlers for the verifyStudentLogin function
 * assign the parameter needed from request body to variable
 */
const verifyStudentLogin = async (request, response) => {
  // for debugging purpose
  console.log("verifyStudentLogin called");
  console.log("Raw request body:", request.body);
  
  try {
    const { email, password } = request.body;
    const result = await studentService.verifyStudentLogin(email, password);
    response.status(200).json(result);
  } catch (error) {
    console.log("Error details:", error.message);
    response.status(401).json({ error: error.message });
  }
}

module.exports = {
  getAllStudents,
  registerStudent,
  verifyStudentLogin
};