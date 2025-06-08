const database = require('../database');

const getAllStudents = async () => {
  return database.any('SELECT * FROM student');
};

module.exports = {
  getAllStudents,
};