import {AuthService} from './AuthService';
import type { FinalQuizStructure } from '../Types/FinalQuizTypes';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function fetchFinalQuizWithQuestions(courseId: string): Promise<FinalQuizStructure | null> {
    const isAuth = AuthService.isAuthenticated();
    if (!isAuth) {
        throw new Error('User is not authenticated. Please log in again.');
    }
    try {
        const response = await fetch(`${API_BASE}/final-quiz-routes/final-quiz`, {
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
