const finalQuizService = require('../services/finalQuizService');
const { sanitiseText } = require('../validation/textSanitiser');

/**
 * GET final quiz for a course, including questions and options.
 * 
 */
async function getFinalQuizWithQuestions(req, res) {
    const {course_id} = req.body;

    if (!course_id) {
        return res.status(400).json({ message: 'Missing courseId' });
    }

    try {
        const sanitisedCourseId = sanitiseText(course_id);
        const finalQuiz = await finalQuizService.getFinalQuizWithQuestions(sanitisedCourseId);

        if (!finalQuiz) {
            return res.status(404).json({ message: 'Final quiz not found for the given course' });
        }

        
        return res.status(200).json(finalQuiz);
    } catch (err) {
        console.error('Error fetching final quiz with questions:', err);
        return res.status(500).json({ message: 'An error occurred while fetching the final quiz' });
    }
}

/**
 *  A function to called different final quiz controllers based on the action parameter in the body.
 */
async function finalQuizController(req, res) {
    const { action } = req.body;

    switch (action) {
        case 'getFinalQuizWithQuestions':
            return getFinalQuizWithQuestions(req, res);
        default:
            return res.status(400).json({ message: 'Invalid action' });
    }
}

module.exports = {
    finalQuizController
};