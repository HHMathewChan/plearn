/**
 * This file is for the Service for student learning preferences usecase of the application.
 */

const hasLearningModeForRepository = require('../repositories/hasLearningModeForRepository');
const chosenTopicRepository = require('../repositories/chosenTopicRepository');
const interestedInRepository = require('../repositories/interestedInRepository');
const hasTopicReferenceToRepository = require('../repositories/hasTopicReferenceToRepository');

/**
 * This is the usecase to create learning preferences of the student
 * @param {string} studentCode - The code of the student.
 * @param {string} learningModeID - The learning mode ID.
 * @param {object} topicPreferences - The object containing topic preferences with IDs, interest levels, and knowledge proficiency.
 * @returns {Promise} - A promise that resolves when the preferences are created.
 */
const createStudentLearningPreferences = async (studentCode, learningModeID, topicPreferences) => {
  try {
    // for debugging
    console.log('At studentLearningPerferenceService, Creating student learning preferences with the following data:');
    console.log('Student Code:', studentCode);
    console.log('Learning Mode ID:', learningModeID);
    console.log('Topic Preferences:', topicPreferences);

    // Create link to learning mode for the student
    const learningModeLinkResult = await hasLearningModeForRepository.createRecord(studentCode, learningModeID);
    // for debugging
    console.log('At studentLearningPerferenceService, Successfully created learning mode link record into database:', learningModeLinkResult);

    // Process each topic preference (maximum 3 as per requirements)
    const createdTopicPreferences = await Promise.all(topicPreferences.map(async (topicPreference) => {
      const { topic_id, interest_level, knowledge_proficiency } = topicPreference;

      // Create chosen topic record with interest level and knowledge proficiency
      const chosenTopicPreference = await chosenTopicRepository.createRecord(
        topic_id,
        studentCode,
        interest_level,
        knowledge_proficiency
      );
      // for debugging
      console.log('At studentLearningPerferenceService, Successfully created chosen topic preference record into database:', chosenTopicPreference);

      // Create the relationship records
      const relationshipResult = await Promise.all([
        hasTopicReferenceToRepository.createRecord(chosenTopicPreference.id, topic_id),
        interestedInRepository.createRecord(chosenTopicPreference.id, studentCode)
      ]);
      // for debugging
      console.log('At studentLearningPerferenceService, Relationship records are successfully inserted into database:', relationshipResult);
      return chosenTopicPreference;

    }));
    // return meaningful result 
    return {
      success: true,
      message: 'Successfully created student learning preferences',
      result: createdTopicPreferences
    };
  } catch (error) {
    console.error('Error creating student learning preferences at createStudentLearningPreferences, studentLearningPreferencesService:', error);
    throw new Error(`Failed to create learning preferences at createStudentLearningPreferences, studentLearningPreferencesService: ${error.message}`);
  }
};

module.exports = {
  createStudentLearningPreferences
};