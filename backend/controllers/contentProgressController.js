const contentProgressService = require('../services/contentProgressService');
const { sanitiseText } = require('../validation/textSanitiser');

/**
 * Retrieves all content progress records for a specific student.
 */
async function getAllContentProgress(req, res) {
    try {
        const { student_code } = req.params;
        // for debugging
        console.log("Fetching content progress for student:", student_code);
        //sanitise the input
        const sanitisedStudentCode = sanitiseText(student_code);
        // for debugging
        console.log("Fetching content progress for student after sanitisation:", sanitisedStudentCode);
        const progressRecords = await contentProgressService.getAllContentProgress(sanitisedStudentCode);
        res.status(200).json(progressRecords);
    } catch (error) {
        console.error('Error fetching content progress:', error);
        res.status(500).json({ message: 'Failed to retrieve content progress.' });
    }
}

/**
 * Retrieves the status of a specific content progress record.
 */
async function getContentProgressStatus(req, res) {
    try {
        const { student_code, content_id, content_progress_id } = req.body;
        const status = await contentProgressService.getContentProgressStatus(student_code, content_id, content_progress_id);
        if (status === null) {
            return res.status(404).json({ message: 'Content progress not found.' });
        }
        res.status(200).json({ status });
    } catch (error) {
        console.error('Error fetching content progress status:', error);
        res.status(500).json({ message: 'Failed to retrieve content progress status.' });
    }
}

/**
 * Creates a new content progress record for a student.
 */
async function createContentProgress(req, res) {
    try {
        const { student_code, content_id } = req.body;
        // for debugging
        console.log("Creating content progress for student:", student_code, "with content ID:", content_id);
        // sanitise the input
        const sanitisedStudentCode = sanitiseText(student_code);
        const sanitisedContentId = sanitiseText(content_id);
        // for debugging
        console.log("Creating content progress for student after sanitisation:", sanitisedStudentCode, "with content ID:", sanitisedContentId);
        const newProgress = await contentProgressService.createContentProgress(sanitisedStudentCode, sanitisedContentId);
        res.status(201).json(newProgress);
    } catch (error) {
        console.error('Error creating content progress:', error);
        res.status(500).json({ message: 'Failed to create content progress.' });
    }
}

 /**
 * Update the content progress status for a student.
 */
async function updateContentProgress(req, res) {
    try {
        const { student_code, content_id, status } = req.body;
        // for debugging
        console.log("Updating content progress for student:", student_code, "with content ID:", content_id, "to status:", status);
        // sanitise the input
        const sanitisedStudentCode = sanitiseText(student_code);
        const sanitisedContentId = sanitiseText(content_id);
        const sanitisedStatus = sanitiseText(status);
        // for debugging
        console.log("Updating content progress for student after sanitisation:", sanitisedStudentCode, "with content ID:", sanitisedContentId, "to status:", sanitisedStatus);
        const updatedProgress = await contentProgressService.updateContentProgress(sanitisedStudentCode, sanitisedContentId, sanitisedStatus);
        if (!updatedProgress) {
            return res.status(404).json({ message: 'Content progress not found.' });
        }
        res.status(200).json(updatedProgress);
    } catch (error) {
        console.error('Error updating content progress:', error);
        res.status(500).json({ message: 'Failed to update content progress.' });
    }
}

/**
 * Checks if a student has content progress for a specific content item.
 * @param {string} student_code - The code identifying the student.
 * @param {string} content_id - The ID of the content item.
 * @returns {Promise<boolean>} - True if the student has progress, false otherwise.
 */
async function hasContentProgress(req, res) {
    try {
        const { student_code, content_id } = req.body;
        // for debugging
        console.log("Checking content progress for student:", student_code, "with content ID:", content_id);
        // sanitise the input
        const sanitisedStudentCode = sanitiseText(student_code);
        const sanitisedContentId = sanitiseText(content_id);
        // for debugging
        console.log("Checking content progress for student after sanitisation:", sanitisedStudentCode, "with content ID:", sanitisedContentId);
        const hasProgress = await contentProgressService.hasContentProgress(sanitisedStudentCode, sanitisedContentId);
        res.status(200).json({ hasProgress });
    } catch (error) {
        console.error('Error checking content progress:', error);
        res.status(500).json({ message: 'Failed to check content progress.' });
    }
}

/**
 *  A function to called different content progress controllers based on the action parameter in the body.
 */
async function contentProgressController(req, res) {
    const { action } = req.body;
    // for debugging
    console.log("Content progress action:", action);
    switch (action) {
        case 'getAll':
            return getAllContentProgress(req, res);
        case 'getStatus':
            return getContentProgressStatus(req, res);
        case 'create':
            return createContentProgress(req, res);
        case 'update':
            return updateContentProgress(req, res);
        case 'hasContentProgress':
            return hasContentProgress(req, res);
        default:
            return res.status(400).json({ message: 'Invalid action.' });
    }
}

module.exports = {
    getAllContentProgress,
    getContentProgressStatus,
    createContentProgress,
    updateContentProgress,
    contentProgressController
};