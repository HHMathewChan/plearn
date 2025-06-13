const studentRepository = require('../repositories/studentRepository');
const platformUserRepository = require('../repositories/platformUserRepository');
const hasStudentProfileInRepository = require('../repositories/hasStudentProfileInRepository');


const getAllStudents = async () => {
  return await studentRepository.queryAllStudents();
};

module.exports = {
  getAllStudents
};