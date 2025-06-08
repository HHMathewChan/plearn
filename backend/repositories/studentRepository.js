const database = require('../database');

const queryAllStudents = async () => {
  return database.any('SELECT * FROM student');
};

module.exports = {
  queryAllStudents,
};