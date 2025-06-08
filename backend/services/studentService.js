const studentRepo = require('../repositories/studentRepository');

const getAllStudents = async () => {
  return await studentRepo.queryAllStudents();
};

module.exports = {
  getAllStudents,
};