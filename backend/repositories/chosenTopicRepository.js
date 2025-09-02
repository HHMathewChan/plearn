const database = require('../database');

/**
 * Inserts a chosen topic into the database.
* @param {string} topicId - The ID of the topic.
* @param {string} studentCode - The code of the student.
* @param {string} interestLevel - The interest level of the student in the topic.
* @param {string} knowledgeProficiency - The knowledge proficiency of the student in the topic.
 * @returns {Promise} - A promise that resolves when the record is inserted.
 */
const createRecord = async (topicId, studentCode, interestLevel, knowledgeProficiency) => {
    // for debugging
    console.log('Inserting chosen topic into database:', { studentCode, topicId, interestLevel, knowledgeProficiency });
    const result = await database.oneOrNone(
        'INSERT INTO chosentopic (id,student_code, topic_id, interest_level, knowledge_proficiency) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *',
        [studentCode, topicId, interestLevel, knowledgeProficiency]
    );
    // for debugging
    console.log('Inserted chosen topic into database:', result);
    return result;
};

module.exports = {
  createRecord,
};
