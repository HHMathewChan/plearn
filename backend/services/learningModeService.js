const learningModeRepository = require("../repositories/learningModeRepository");

/**
 * Get all learning modes.
 * @returns {Promise<Array>} - A promise that resolves to an array of learning modes.
 */
async function getAllLearningModes() {
    return await learningModeRepository.getAllLearningModes();
}

module.exports = {
    getAllLearningModes
};
