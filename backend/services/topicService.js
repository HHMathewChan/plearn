const topicRepository = require('../repositories/topicRepository');

/**
 * Get all topics.
 * @returns {Promise<Array>} - A promise that resolves to an array of topics.
 */
async function getAllTopics() {
    return await topicRepository.getAllTopics();
}

module.exports = {
    getAllTopics
};
