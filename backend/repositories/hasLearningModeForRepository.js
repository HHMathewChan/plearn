const database = require('../database');

/**
 * Creates a new record in the haslearningmodefor table.
 * @param {string} studentCode - The code of the student.
 * @param {string} learningModeID - The Id of learning mode.
 * @returns {Promise} - A promise that resolves when the record is created.
 */
const createRecord = async (studentCode, learningModeID) => {
  // for debugging
  console.log('Inserting haslearningmodefor record into database:', { studentCode, learningModeID });
  const result = await database.oneOrNone(
    'INSERT INTO haslearningmodefor (student_code, learning_mode_id) VALUES ($1, $2) RETURNING *',
    [studentCode, learningModeID]
  );
  // for debugging
  console.log('Inserted haslearningmodefor record into database:', result);
  return result;
};

module.exports = {
  createRecord,
};
