const studentRepository = require('../repositories/studentRepository');
const platformUserRepository = require('../repositories/platformUserRepository');
const hasStudentProfileInRepository = require('../repositories/hasStudentProfileInRepository');

const getAllStudents = async () => {
  return await studentRepository.queryAllStudents();
};

/* add a new student. First, create a student in the database,
then create a platform user for the student, and use the returned student_code and id to create a HasStudentProfileIn */
const createStudent = async () => {
  const student_code = await studentRepository.createStudent();
  const platform_user_id = await platformUserRepository.createPlatformUser();
  await hasStudentProfileInRepository.createHasStudentProfileIn(student_code, platform_user_id);
  return student_code;
};


module.exports = {
  getAllStudents,
  createStudent
};