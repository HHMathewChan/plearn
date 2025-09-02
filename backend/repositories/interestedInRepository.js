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

module.exports = {
  createRecord,
};
