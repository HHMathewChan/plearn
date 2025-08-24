const database = require('../database');

/**
 * Create a new log entry for active quiz attempts associated with a student.
 */
const createRecord = async (quizAttemptId, studentCode) => {
    if (!quizAttemptId) {
        throw new TypeError('createRecord: quizAttemptId is required');
    }
    if (!studentCode) {
        throw new TypeError('createRecord: studentCode is required');
    }

    try {
        const result = await database.query(
            'INSERT INTO logactiveattemptforstudentat (quiz_attempt_id, student_code) VALUES ($1, $2)',
            [quizAttemptId, studentCode]
        );
        // for debugging
        console.log('At logActiveAttemptForStudentAtRepository, Created record:', result);
        return result;
    } catch (err) {
        console.error(
            'Error in createRecord (logActiveAttemptForStudentAtRepository):',
            { quizAttemptId, studentCode, message: err.message, stack: err.stack }
        );
        // Preserve original error for higher-level handling
        throw new Error(`Failed to create log record for quizAttemptId=${quizAttemptId}, studentCode=${studentCode}: ${err.message}`);
    }
}

/**
 * Find the active quiz attempts for a student
 * @returns {Object|null} The quiz attempt record or null if not found
 */
const getRecord = async (studentCode) => {
    if (!studentCode) {
        throw new TypeError('getRecord: studentCode is required');
    }

    try {
        const result = await database.oneOrNone(
            'SELECT * FROM logactiveattemptforstudentat WHERE student_code = $1',
            [studentCode]
        );
        return result;
    } catch (err) {
        console.error(
            'Error in getRecord (logActiveAttemptForStudentAtRepository):',
            { studentCode, message: err.message, stack: err.stack }
        );
        throw new Error(`Failed to get quiz attempt for studentCode=${studentCode}: ${err.message}`);
    }
}

/**
 * Delete a log entry for active quiz attempts associated with a student.
 */
const deleteRecord = async (quizAttemptId, studentCode) => {
    if (!quizAttemptId) {
        throw new TypeError('deleteRecord: quizAttemptId is required');
    }
    if (!studentCode) {
        throw new TypeError('deleteRecord: studentCode is required');
    }

    try {
        const result = await database.query(
            'DELETE FROM logactiveattemptforstudentat WHERE quiz_attempt_id = $1 AND student_code = $2',
            [quizAttemptId, studentCode]
        );
        // result.rowCount may not be present depending on the DB lib; normalise to boolean
        const deleted = typeof result.rowCount === 'number' ? result.rowCount > 0 : Boolean(result);
        return deleted;
    } catch (err) {
        console.error(
            'Error in deleteRecord (logActiveAttemptForStudentAtRepository):',
            { quizAttemptId, studentCode, message: err.message, stack: err.stack }
        );
        throw new Error(`Failed to delete log record for quizAttemptId=${quizAttemptId}, studentCode=${studentCode}: ${err.message}`);
    }
}

module.exports = {
    createRecord,
    getRecord,
    deleteRecord
};