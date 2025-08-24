const database = require('../database');

/**
 * Create a new log entry for active attempts associated with a final quiz.
 */
const createRecord = async (finalQuizId, quizAttemptId) => {
    if (finalQuizId == null || quizAttemptId == null) {
        throw new Error('At logActiveAttemptForFinalQuizWithRepository, createRecord: finalQuizId and quizAttemptId are required');
    }

    try {
        // Ensure returning the created row if the DB client supports RETURNING
        const result = await database.query(
            'INSERT INTO logactiveattemptforfinalquizwith (final_quiz_id, quiz_attempt_id) VALUES ($1, $2) RETURNING *',
            [finalQuizId, quizAttemptId]
        );

        // Support different DB client return shapes
        if (result && result.rows && result.rows[0]) return result.rows[0];
        if (Array.isArray(result) && result[0]) return result[0];
        return null;
    } catch (err) {
        console.error('createRecord: failed to insert log entry', { finalQuizId, quizAttemptId, err });
        throw new Error(`createRecord failed: ${err.message}`);
    }
}

/**
 * Delete the log entry for active attempts associated with a final quiz.
 */
const deleteRecord = async (finalQuizId, quizAttemptId) => {
    if (finalQuizId == null || quizAttemptId == null) {
        throw new Error('At logActiveAttemptForFinalQuizWithRepository, deleteRecord: finalQuizId and quizAttemptId are required');
    }

    try {
        const result = await database.query(
            'DELETE FROM logactiveattemptforfinalquizwith WHERE final_quiz_id = $1 AND quiz_attempt_id = $2',
            [finalQuizId, quizAttemptId]
        );

        // Handle different client result shapes
        if (result && typeof result.rowCount === 'number') return result.rowCount > 0;
        if (typeof result === 'number') return result > 0;
        return false;
    } catch (err) {
        console.error('deleteRecord: failed to delete log entry', { finalQuizId, quizAttemptId, err });
        throw new Error(`deleteRecord failed: ${err.message}`);
    }
}

// ...existing code...

module.exports = {
    createRecord,
    deleteRecord
};