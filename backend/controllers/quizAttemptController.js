const quizAttemptService = require('../services/quizAttemptService');

/**
 * Create an active quiz attempt for a student
 * Expects studentCode and finalQuizId in req.body
 */
const createQuizAttempt = async (req, res) => {
    try {
        const { student_code, final_quiz_id } = req.body || {};
        //for debugging
        console.log('At quizAttemptController, Creating quiz attempt for:', { student_code, final_quiz_id });

        if (!student_code || !final_quiz_id) {
            return res.status(400).json({ error: 'student_code and final_quiz_id are required.' });
        }

        const quizAttempt = await quizAttemptService.createQuizAttempt(student_code, final_quiz_id);

        return res.status(201).json({ data: quizAttempt });
    } catch (err) {
        console.error('[quizAttemptController.createQuizAttempt]', err);
        return res.status(500).json({ error: 'An unexpected error occurred while creating quiz attempt.' });
    }
};

/**
 * Complete a quiz attempt.
 */
const completeQuizAttempt = async (req, res) => {
    try {
        const { final_quiz_id, student_code } = req.body || {};
        //for debugging
        console.log('At quizAttemptController, Completing quiz attempt for:', { final_quiz_id, student_code });

        if (!final_quiz_id || !student_code) {
            return res.status(400).json({ error: 'final_quiz_id and student_code are required.' });
        }

        const quizAttempt = await quizAttemptService.completeQuizAttempt(final_quiz_id, student_code);

        return res.status(200).json({ data: quizAttempt });
    } catch (err) {
        console.error('[quizAttemptController.completeQuizAttempt]', err);
        return res.status(500).json({ error: 'An unexpected error occurred while completing quiz attempt.' });
    }
};

/**
 *  A function to called different quiz attempt controllers based on the action parameter in the body.
 */
const quizAttemptController = async (req, res) => {
    const { action } = req.body;

    switch (action) {
        case 'create':
            return createQuizAttempt(req, res);
        case 'complete':
            return completeQuizAttempt(req, res);
        default:
            return res.status(400).json({ error: 'Invalid action.' });
    }
};

module.exports = {
    quizAttemptController
};