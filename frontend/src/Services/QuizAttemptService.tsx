import {AuthService} from './AuthService';

const API_BASE_URL = 'http://localhost:3001/api/quiz-attempt-routes';

type optionId = string;

export const createQuizAttempt = async (studentCode: string, courseId: string) => {
    const isAuth = AuthService.isAuthenticated();
    if (!isAuth) {
        throw new Error('User is not authenticated. Please log in again.');
    }
    try {
        const response = await fetch(`${API_BASE_URL}/quiz-attempt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                action: 'attempt_final_quiz',
                student_code: studentCode, 
                course_id: courseId
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // for debugging
        const data = await response.json();
        console.log('At QuizAttemptService.tsx: Final quiz attempt created:', data);
        return data;
    } catch (error) {
        console.error('At QuizAttemptService.tsx: Error fetching final quiz:', error);
        throw error;
    }
}

export const submitQuizAttempt = async (courseId: string, studentCode: string, answers: { [questionId: string]: optionId }) => {
    const isAuth = AuthService.isAuthenticated();
    if (!isAuth) {
        throw new Error('User is not authenticated. Please log in again.');
    }
    try {
        const response = await fetch(`${API_BASE_URL}/quiz-attempt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                action: 'completed',
                course_id: courseId, 
                student_code: studentCode,
                student_answers: answers
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('At QuizAttemptService.tsx: Final quiz submitted:', data);
        return data;
    } catch (error) {
        console.error('At QuizAttemptService.tsx: Error submitting final quiz:', error);
        throw error;
    }
}