const database = require('../database');

/**
 * Get all existing learning modes.
 * @returns {Promise} - A promise that resolves to an array of learning modes.
 */
const getAllLearningModes = async () => {
  // for debugging
  console.log('At learningModeRepository, Retrieving all learning modes from database...');
  const result = await database.any('SELECT * FROM learningmode');
  // for debugging
  console.log('Retrieved all learning modes from database:', result);
  return result;
};

module.exports = {
  getAllLearningModes,
};
