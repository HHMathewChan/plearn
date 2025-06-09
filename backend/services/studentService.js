const studentRepository = require('../repositories/studentRepository');

const getAllStudents = async () => {
  return await studentRepository.queryAllStudents();
};

module.exports = {
  getAllStudents,
};