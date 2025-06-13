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

module.exports = {
  getAllStudents
};