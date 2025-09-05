const database = require('../database');

/**
 * Inserts a new record in the interestein table.
 * @param {string} studentCode - The code of the student.
 * @param {string} chosenTopicID - The interested topic.
 * @returns {Promise} - A promise that resolves when the record is inserted.
 */
const createRecord = async(chosenTopicID, studentCode) => {
    // for debugging
    console.log('Inserting interestedin record into database:', { chosenTopicID, studentCode });
    const result = await database.oneOrNone(
      'INSERT INTO interestedin (chosen_topic_id, student_code) VALUES ($1, $2) RETURNING *',
      [chosenTopicID, studentCode]
    );
    // for debugging
    console.log('Inserted interestedin record into database:', result);
    return result;
};

/**
 * Finds all records for a given student code.
 * @param {string} studentCode - The code of the student.
 * @returns {Promise} - A promise that resolves with the found records or an empty array.
 */
const findRecordsByStudentCode = async (studentCode) => {
  try {
    //for debugging
    console.log('Finding interestedin records by student code:', studentCode);
    const result = await database.any(
      'SELECT * FROM interestedin WHERE student_code = $1',
      [studentCode]
    );
    //for debugging
    console.log('Found interestedin records by student code:', result);
    return result;
  } catch (error) {
    console.error('Error finding interestedin records by student code:', error);
    throw new Error(`Failed to find interestedin records: ${error.message}`);
  }
};

module.exports = {
  createRecord,
  findRecordsByStudentCode
};
