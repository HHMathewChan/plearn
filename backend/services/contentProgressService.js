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
 * Either passing the content progress ID directly or passing student code and content id.
  * @param {string} studentCode - The code identifying the student.
  * @param {string} contentId - The ID of the content item.
  * @param {string} contentProgressId - The UUID of the content progress item.
  * @returns {Promise<string|null>} - The status of the content progress, or null if not found.
 */
async function getContentProgressStatus(studentCode, contentId, contentProgressId) {
    // If contentProgressId is null or undefined, fall back to studentCode and contentId
    // First, find the content progress id
    if (contentProgressId == null) {
        const contentProgressId = await hasContentProgressForRepository.getContentProgressId(studentCode, contentId);
        const contentProgress = await contentProgressRepository.getContentProgress(contentProgressId);
        // for debugging
        console.log(" At getContentProgressStatus - Fetched content progress status:", contentProgress.status );
        return contentProgress ? contentProgress.status : null;
    }
    else {
    const contentProgress = await contentProgressRepository.getContentProgress(contentProgressId);
    return contentProgress ? contentProgress.status : null;
    }
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
 * Update a content progress record
 * @param {string} studentCode - The code identifying the student.
 * @param {string} contentId - The ID of the content item.
 * @param {string} status - The new status of the content progress.
 * @param {Date|null} dateCompleted - The date the content was completed, or null if not completed.
 * @param {Date} lastUpdated - The date the content progress was last updated.
 * @returns {Promise<Object|null>} - The updated content progress record, or null if not found.
 */
async function updateContentProgress(studentCode, contentId, status) {
    // First, find the content progress id
    const contentProgressId = await hasContentProgressForRepository.getContentProgressId(studentCode, contentId);
    // for debugging
    console.log("Found content progress ID:", contentProgressId);
    // If the status is "not_started", we call the uncompleteContentProgress function
    if (status === "not_started") {
        return uncompleteContentProgress(contentProgressId, contentId);
    }
    //otherwise, call the completeContentProgressUsecase function
    return completeContentProgress(contentProgressId, contentId);
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

 /**
 * Marks a content item as not started for a student.
 * @param {string} studentCode - The code identifying the student.
 * @param {string} contentProgressId - The ID of the content progress item.
 * @returns {Promise<Object|null>} - The updated content progress record, or null if not found.
 */
async function uncompleteContentProgress(contentProgressId, contentId) {
    // Update the content progress status to 'not_started'
    // set completed_at to null
    const dateCompleted = null;
    // set last_update to now
    const lastUpdated = new Date();
    const updatedContentProgress = await contentProgressRepository.updateContentProgress(contentProgressId, contentId, 'not_started', dateCompleted, lastUpdated);
    return updatedContentProgress;
}

/**
 * Check If a student has a content progress for a content
 * @param {string} studentCode - The code identifying the student.
 * @param {string} contentId - The ID of the content item.
 * @returns {Promise<boolean>} - True if the student has progress, false otherwise.
 */
async function hasContentProgress(studentCode, contentId) {
    const contentProgressId = await hasContentProgressForRepository.getContentProgressId(studentCode, contentId);
    return contentProgressId !== null;
}

module.exports = {
    getAllContentProgress,
    getContentProgressStatus,
    createContentProgress,
    updateContentProgress,
    hasContentProgress
};