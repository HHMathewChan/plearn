/**
 * This file is for the Service for student learning preferences usecase of the application.
 */

const hasLearningModeForRepository = require('../repositories/hasLearningModeForRepository');
const chosenTopicRepository = require('../repositories/chosenTopicRepository');
const interestedInRepository = require('../repositories/interestedInRepository');
const hasTopicReferenceToRepository = require('../repositories/hasTopicReferenceToRepository');
const learningModeService = require("../services/learningModeService");
const topicService = require("../services/topicService");

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

/**
 * Confirm student has learning preferences
 * @param {string} studentCode - The code of the student.
 * @returns {Promise} - A promise that resolves with the confirmation result.
 */
const studentHasLearningPreferences = async (studentCode) => {
  try {
    // Fetch the student's learning preferences from the database
    //confirm both if the student has any learning preferences and chosen topic by checking thier links
    const hasLearningModeLinked = await hasLearningModeForRepository.getRecordByStudentCode(studentCode);
    const hasChosenTopicsLinked = await interestedInRepository.findRecordsByStudentCode(studentCode);

    if (!hasLearningModeLinked || !hasChosenTopicsLinked) {
      return {
        success: false,
        message: 'No learning preferences found for the student',
        result: null
      };
    }
    return {
      success: true,
      message: 'Student has learning preferences',
      result: {
        "hasLearningModeLinked": hasLearningModeLinked,
        "hasChosenTopicsLinked": hasChosenTopicsLinked
      }
    };
  } catch (error) {
    console.error('Error retrieving student learning preferences at studentHasLearningPreferences, studentLearningPreferencesService:', error);
    throw new Error(`Failed to get learning preferences at studentHasLearningPreferences, studentLearningPreferencesService: ${error.message}`);
  }
};

/**
 * Get all learning modes and topics for the survey
 * @returns {Promise} - A promise that resolves with the learning modes and topics.
 */
const getDataForLearningPreferencesSurvey = async () => {
  try {
    const [learningModes, topics] = await Promise.all([
      learningModeService.getAllLearningModes(),
      topicService.getAllTopics()
    ]);
    return {
      success: true,
      message: 'Successfully retrieved learning modes and topics',
      result: {
        learningModes,
        topics
      }
    };
  } catch (error) {
    console.error('Error retrieving learning modes and topics at getAllLearningModesAndTopics, studentLearningPreferencesService:', error);
    throw new Error(`Failed to get learning modes and topics at getAllLearningModesAndTopics, studentLearningPreferencesService: ${error.message}`);
  }
};

/**
 * Get the learning preference of the student
 * @param {string} studentCode - The code of the student.
 * @returns {Promise} - A promise that resolves with the learning preference.
 * @property {string} learningModeName - The name of the learning mode.
 * @property {Array} chosenTopics - An array of objects containing topic_id, interest_level, and knowledge_proficiency.
 */
const getLearningPreferenceOfStudent = async (studentCode) => {
  try {
    // Fetch the student's learning preferences from the database
    const learningModeLink = await hasLearningModeForRepository.getRecordByStudentCode(studentCode);
    // Get the learning mode name
    const learningModeName = await learningModeService.getLearningModeNameById(learningModeLink.learning_mode_id);
    const chosenTopicsLinks = await interestedInRepository.findRecordsByStudentCode(studentCode);
    // for each chosen topic link, get the chosentopic details and put its topic_id, interest_level and knowledge_proficiency into a object
    const chosenTopicsDetails = await Promise.all(chosenTopicsLinks.map(async (link) => {
      const chosenTopic = await chosenTopicRepository.getRecordById(link.chosen_topic_id);
      return {
        topic_id: chosenTopic.topic_id,
        interest_level: chosenTopic.interest_level,
        knowledge_proficiency: chosenTopic.knowledge_proficiency
      };
    }));
    // for debugging
    console.log('At studentLearningPreferencesService, getLearningPreferenceOfStudent, Retrieved learning preferences for student:', studentCode);
    console.log('Learning Mode Link:', learningModeLink);
    console.log('Learning Mode Name:', learningModeName);
    console.log('Chosen Topics Details:', chosenTopicsDetails);
    return {
      result: {
        learningModeName: learningModeName,
        chosenTopics: chosenTopicsDetails
      }
    };
  } catch (error) {
    console.error('Error retrieving learning preferences at getLearningPreferenceOfStudent, studentLearningPreferencesService:', error);
    throw new Error(`Failed to get learning preferences at getLearningPreferenceOfStudent, studentLearningPreferencesService: ${error.message}`);
  }
};

module.exports = {
  createStudentLearningPreferences,
  studentHasLearningPreferences,
  getDataForLearningPreferencesSurvey,
  getLearningPreferenceOfStudent
};