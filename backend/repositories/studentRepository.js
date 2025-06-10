const database = require('../database');

const queryAllStudents = async () => {
  return database.any('SELECT * FROM student');
};

// create a new student and return the student_code
const createStudent = async () => {
  const result = await database.one(
    'INSERT INTO student DEFAULT VALUES RETURNING student_code'
  );
  return result.student_code;
};

module.exports = {
  queryAllStudents,
  createStudent
};