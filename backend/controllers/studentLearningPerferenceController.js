const studentLearningPreferenceService = require('../services/studentLearningPerferenceService');

/**
 * Controller to handle the creation of student learning preferences
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Promise that resolves when response is sent
 */
const createStudentLearningPreferences = async (req, res) => {
  try {
    const { student_code, learning_mode_id, topic_preferences } = req.body;

    // Validate required fields
    if (!student_code) {
      return res.status(400).json({
        success: false,
        message: 'Student code is required'
      });
    }

    if (!learning_mode_id) {
      return res.status(400).json({
        success: false,
        message: 'Learning mode ID is required'
      });
    }

    if (!topic_preferences || !Array.isArray(topic_preferences)) {
      return res.status(400).json({
        success: false,
        message: 'Topic preferences must be provided as an array'
      });
    }

    // Validate maximum 3 topic preferences as per requirements
    if (topic_preferences.length === 0 || topic_preferences.length > 3) {
      return res.status(400).json({
        success: false,
        message: 'Topic preferences must contain between 1 and 3 items'
      });
    }

    // Validate each topic preference object
    for (const preference of topic_preferences) {
      if (!preference.topic_id || !preference.interest_level || !preference.knowledge_proficiency) {
        return res.status(400).json({
          success: false,
          message: 'Each topic preference must include topic_id, interest_level, and knowledge_proficiency'
        });
      }
    }

    // for debugging
    console.log('At studentLearningPerferenceController, Creating student learning preferences with the following data:');
    console.log('Student Code:', student_code);
    console.log('Learning Mode ID:', learning_mode_id);
    console.log('Topic Preferences:', topic_preferences);

    // Call the service to create learning preferences
    const result = await studentLearningPreferenceService.createStudentLearningPreferences(
      student_code,
      learning_mode_id,
      topic_preferences
    );
    // for debugging
    console.log('At studentLearningPerferenceController, Successfully created student learning preferences:', result);
    // Return successful response
    return res.status(201).json(result);

  } catch (error) {
    console.error('Error in createStudentLearningPreferences controller:', error);

    // Return generic error response
    return res.status(500).json({
      success: false,
      message: 'An error occurred whilst creating learning preferences',
      error: 'Internal server error'
    });
  }
};

module.exports = {
  createStudentLearningPreferences
};