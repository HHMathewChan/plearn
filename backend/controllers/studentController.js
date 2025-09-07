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

const getStudentProfileForRecommendations = async (request, response) => {
  const { studentCode } = request.params;
  try {
    const profile = await studentService.getStudentProfileForRecommendations(studentCode);
    response.json(profile);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentProfileForRecommendations
};