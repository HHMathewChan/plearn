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

/**
 * Get the learning mode name by its ID.
 * @param {number} Id - The ID of the learning mode.
 * @returns {Promise<string|null>} - A promise that resolves to the mode name or null if not found.
 */
const getModeNameById = async (Id) => {
  // for debugging
  console.log('At learningModeRepository, Retrieving mode name by ID from database...');
  const result = await database.oneOrNone('SELECT mode_name FROM learningmode WHERE id = $1', [Id]);
  // for debugging
  console.log('Retrieved mode name from database:', result);
  return result ? result.mode_name : null;
};

module.exports = {
  getAllLearningModes,
  getModeNameById
};
