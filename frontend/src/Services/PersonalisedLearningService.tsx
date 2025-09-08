const API_BASE_URL = 'http://localhost:3001/api/personalise-learning-routes';

import type{ RecommendedCourses } from '../Types/CourseType';

/**
 * Get personalised course recommendations for a student.
 */
export const getPersonalisedCourseRecommendations = async (studentCode: string): Promise<RecommendedCourses> => {
    try {
        const response = await fetch(`${API_BASE_URL}/recommend-courses/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                student_code: studentCode 
            })
        });
        if (!response.ok) {
            throw new Error('Failed to fetch course recommendations');
        }
        const data = await response.json();
        // for debugging
        console.log('At PersonalisedLearningService.tsx: Course recommendations fetched:', data);
        const recommendations = data.recommendations;
        // for debugging
        console.log('At PersonalisedLearningService.tsx: Parsed recommendations:', recommendations);
        return recommendations;
    } catch (error) {
        console.error('Error fetching course recommendations:', error);
        throw error;
    }
}