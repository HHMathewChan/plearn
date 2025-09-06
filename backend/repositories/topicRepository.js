const database = require('../database');

/**
 * Get all the topics.
 * @returns {Promise} - A promise that resolves to an array of topics.
 */
const getAllTopics = async () => {
  // for debugging
  console.log('At topicRepository, Retrieving all topics from database...');
  const result = await database.any('SELECT * FROM topic');
  // for debugging
  console.log('Retrieved all topics from database:', result);
  return result;
};

module.exports = {
  getAllTopics,
};
