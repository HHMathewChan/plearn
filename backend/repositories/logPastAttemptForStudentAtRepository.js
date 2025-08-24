const database = require('../database');

/**
 * get all attempts for a student
 * @param {*} studentCode 
 * @returns 
 */
async function getAllPastAttemptsForStudent(studentCode) {
    const result = await database.any(
        'SELECT * FROM logpastattemptforstudentat WHERE student_code = $1',
        [studentCode]
    );
    return result;
}

/**
 * Create a new log entry for past attempts associated with a student.
 */
async function createRecord(quizAttemptId, studentCode) {
    const result = await database.query(
        'INSERT INTO logpastattemptforstudentat (quiz_attempt_id, student_code) VALUES ($1, $2)',
        [quizAttemptId, studentCode]
    );
    return result[0];
}

module.exports = {
    getAllPastAttemptsForStudent,
    createRecord
};
