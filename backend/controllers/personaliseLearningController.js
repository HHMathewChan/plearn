const personaliseLearningService = require('../services/personaliseLearningService');

/**
 * Controller for recommending courses to a student
 */
async function recommendCourses(req, res) {
    try {
        const { student_code, topN, candidateCourseList, config } = req.body;
        // for debugging
        console.log('In recommendCourses controller, Received request with data:', { student_code, topN, candidateCourseList, config });
        if (!student_code) {
            return res.status(400).json({ error: 'student_code is required' });
        }

        const recommendations = await personaliseLearningService.recommendCourses(
            student_code,
            candidateCourseList,
            topN,
            config
        );

        return res.json({ recommendations });
    } catch (error) {
        console.error('Error in recommendCourses:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    recommendCourses
};