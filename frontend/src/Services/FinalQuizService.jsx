import {AuthService} from './AuthService';
const API_BASE_URL = 'http://localhost:3001/api/final-quiz-routes/';

/**
 * This function is to obtain the final quiz data with questions
 * @returns {Promise<Object|null>} final quiz object or null if not found
 *
 * Returned structure:
 * {
 *   id,
 *   title,
 *   questions: [
 *     {
 *       id,
 *       question_text,
 *       difficulty,
 *       options: [
 *         { id, option_text, is_correct }
 *       ]
 *     },
 *     ...
 *   ]
 * }
 */
export async function fetchFinalQuizWithQuestions(courseId) {
    const isAuth = AuthService.isAuthenticated();
    if (!isAuth) {
        throw new Error('User is not authenticated. Please log in again.');
    }
    try {
        const response = await fetch(`${API_BASE_URL}/final-quiz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: "getFinalQuizWithQuestions",
                course_id: courseId
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching final quiz:', error);
        throw error;
    }
}
