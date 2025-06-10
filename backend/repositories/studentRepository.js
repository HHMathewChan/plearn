const database = require('../database');

const queryAllStudents = async () => {
  return database.any('SELECT * FROM student');
};

// create a new student and return the student_code
const createStudent = async () => {
  console.log("About to insert new student...");
  
  const result = await database.one(
    'INSERT INTO student DEFAULT VALUES RETURNING student_code'
  );
  
  console.log("Database returned student_code:", result.student_code);
  
  // Let's also check what's currently in the student table
  const allStudents = await database.any('SELECT student_code FROM student ORDER BY student_code DESC LIMIT 5');
  console.log("Recent student codes in database:", allStudents);
  
  return result.student_code;
};

module.exports = {
  queryAllStudents,
  createStudent
};