const hasContentProgressForRepository = require('../repositories/hasContentProgressForRepository');
const contentProgressRepository = require('../repositories/ContentProgressRepository');

/**
 * Retrieves all detailed content progress records for a specific student.
 * @param {string} studentCode - The code identifying the student.
 * @returns {Promise<Array>} - An array of detailed content progress records.
 */
async function getAllContentProgress(studentCode) {
    // for debugging
    console.log("At contentProgressService - Fetching all content progress for student:", studentCode);
    // Step 1: Get all content progress IDs for the student
    const contentProgressLinks = await hasContentProgressForRepository.getAllContentProgress(studentCode);
    // for debugging
    console.log("Content progress links for student:", contentProgressLinks);
    if (!contentProgressLinks || contentProgressLinks.length === 0) {
        return [];
    }

    // Step 2: For each content_progress_id, fetch the detailed content progress record
    const contentProgressPromises = contentProgressLinks.map(link =>
        contentProgressRepository.getContentProgress(link.content_progress_id)
    );

    // Await all promises and filter out any null results
    const contentProgress = (await Promise.all(contentProgressPromises)).filter(Boolean);

    return contentProgress;
}

/**
 * Retrieves the status of a specific content progress record by content progress ID.
 * @param {string} contentProgressId - The UUID of the content progress item.
 * @returns {Promise<string|null>} - The status of the content progress, or null if not found.
 */
async function getContentProgressStatus(contentProgressId) {
    const contentProgress = await contentProgressRepository.getContentProgress(contentProgressId);
    return contentProgress ? contentProgress.status : null;
}

/**
 * Creates a new content progress record for a student and links it.
 * @param {string} studentCode - The code identifying the student.
 * @param {string} contentId - The ID of the content item.
 * @param {string} [status='not_started'] - The initial status.
 * @returns {Promise<Object>} - The created content progress record.
 */
async function createContentProgress(studentCode, contentId) {
    // Create the content progress record
    // Initialize variables
    const status = 'not_started';
    const date_completed = null;
    const last_updated = new Date();
    console.log("Creating content progress for student:", studentCode, "with content ID:", contentId);
    const contentProgressID = await contentProgressRepository.createContentProgress(contentId, status, date_completed, last_updated);

    // Link the content progress to the student
    await hasContentProgressForRepository.createHasContentProgressFor(contentProgressID, studentCode);

    return contentProgressID;
}

 /**
 * Marks a content item as completed for a student.
 * @param {string} studentCode - The code identifying the student.
 * @param {string} contentProgressId - The ID of the content progress item.
 * @returns {Promise<Object|null>} - The updated content progress record, or null if not found.
 */
async function completeContentProgress(contentProgressId, contentId) {
    // Update the content progress status to 'completed'
    // set completed_at to now
    const dateCompleted = new Date();
    // set last_update to now
    const lastUpdated = new Date();
    const updatedContentProgress = await contentProgressRepository.updateContentProgress(contentProgressId, contentId, 'completed', dateCompleted, lastUpdated);
    return updatedContentProgress;
}


module.exports = {
    getAllContentProgress,
    getContentProgressStatus,
    createContentProgress,
    completeContentProgress,
};