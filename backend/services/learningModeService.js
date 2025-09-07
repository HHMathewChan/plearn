const learningModeRepository = require("../repositories/learningModeRepository");

/**
 * Get all learning modes.
 * @returns {Promise<Array>} - A promise that resolves to an array of learning modes.
 */
async function getAllLearningModes() {
    return await learningModeRepository.getAllLearningModes();
}

/**
 * Get a learning mode name by its ID.
 * @param {number} learningModeId - The ID of the learning mode.
 * @returns {Promise<string|null>} - A promise that resolves to the name of the learning mode, or null if not found.
 */
async function getLearningModeNameById(learningModeId) {
    const mode = await learningModeRepository.getModeNameById(learningModeId);
    // for debugging
    console.log(`At learningModeService, Learning mode for ID ${learningModeId}:`, mode);
    return mode ? mode.name : null;
}
module.exports = {
    getAllLearningModes,
    getLearningModeNameById
};
