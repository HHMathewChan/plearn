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

/**
 * Get a topic by its ID.
 * @param {string} topicId - The ID of the topic.
 * @returns {Promise<Object|null>} - A promise that resolves to the topic object, or null if not found.
 */
const getTopicById = async (topicId) => {
  const result = await database.any('SELECT * FROM topic WHERE id = $1', [topicId]);
  return result.length > 0 ? result[0] : null;
};

module.exports = {
  getAllTopics,
  getTopicById,
};
