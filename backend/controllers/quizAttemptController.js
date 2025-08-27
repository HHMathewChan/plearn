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
        const { course_id, student_code, student_answers } = req.body || {};
        //for debugging
        console.log('At quizAttemptController, Completing quiz attempt for:', { course_id, student_code });
        console.log('At quizAttemptController, Completing quiz attempt, student answers received:', student_answers, typeof student_answers);

        if (!course_id || !student_code) {
            return res.status(400).json({ error: 'course_id and student_code are required.' });
        }
        // Transform student_answers to the required format from an object to an array
        const transformedAnswers = Object.entries(student_answers).map(([question_id, option_id]) => ({
            question_id,
            option_id
        }));

        const quizAttempt = await quizAttemptService.completeQuizAttempt(course_id, student_code, transformedAnswers);

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
        case 'attempt_final_quiz':
            return attemptFinalQuiz(req, res);
        default:
            return res.status(400).json({ error: 'Invalid action.' });
    }
};

/**
 * Attempt a quiz.
 * Expects studentCode and finalQuizId in req.body
 * @returns {Promise<Object>} - An object containing the quiz attempt and associated student answers.
 */
const attemptFinalQuiz = async (req, res) => {
    try {
        const { student_code, course_id } = req.body || {};
        // For debugging
        console.log('At quizAttemptController, Attempting quiz for:', { student_code, course_id });

        if (!student_code || !course_id) {
            return res.status(400).json({ error: 'student_code and course_id are required.' });
        }

        const result = await quizAttemptService.attemptFinalQuiz(student_code, course_id);

        return res.status(201).json({ data: result });
    } catch (err) {
        console.error('[quizAttemptController.attemptFinalQuiz]', err);
        return res.status(500).json({ error: 'An unexpected error occurred while attempting the quiz.' });
    }
};

module.exports = {
    quizAttemptController,
    attemptFinalQuiz
};