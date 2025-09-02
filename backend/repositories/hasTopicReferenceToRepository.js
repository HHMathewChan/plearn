const database = require('../database');

/**
 *  create a new record in the hastopicreferenceto table.
 * @param {string} chosenTopicID - The ID of the chosen topic.
 * @param {string} topicID - The topic.
 * @returns {Promise} - A promise that resolves when the record is created.
 */
const createRecord = async (chosenTopicID, topicId) => {
  // for debugging
  console.log('Inserting hastopicreferenceto record into database:', { chosenTopicID, topicId });
  const result = await database.oneOrNone(
    'INSERT INTO hastopicreferenceto (chosen_topic_id, topic_id) VALUES ($1, $2) RETURNING *',
    [chosenTopicID, topicId]
  );
  // for debugging
  console.log('Inserted hastopicreferenceto record into database:', result);
  return result;
};

module.exports = {
  createRecord,
};
