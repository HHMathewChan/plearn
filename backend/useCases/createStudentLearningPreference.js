/**
 * @fileoverview This file contains the use case for creating a student learning preference.
 */
const  studentLearningPerferenceService = require("../services/studentLearningPreferenceService");


/**
 * The whole use case to create a student learning preference.
 */
async function createStudentLearningPreferenceUseCase(studentCode, learningModeID, topicPreferences) {
    // Validate input
    if (!studentCode || !learningModeID || !Array.isArray(topicPreferences)) {
        throw new Error("Invalid input");
    }
    // Get A
    // Call the service to create student learning preferences
    const result = await studentLearningPerferenceService.createStudentLearningPreferences(studentCode, learningModeID, topicPreferences);
    return result;
}
