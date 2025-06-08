const database = require('../database');

const getAllStudents = async () => {
  return db.any('SELECT * FROM student');
};

module.exports = {
  getAllStudents,
};