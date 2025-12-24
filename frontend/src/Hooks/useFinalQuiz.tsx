import { useState, useEffect } from 'react';
import { fetchFinalQuizWithQuestions } from '../Services/FinalQuizService';
import type { FinalQuizStructure } from '../Types/FinalQuizTypes';

/**
 * Custom hook to fetch final quiz data based on course ID.
 * @param courseId - The ID of the course for which to fetch the final quiz.
 * @returns An object containing the quiz data and loading state.
 */
export const useFinalQuiz = (courseId: string) => {
    const [quizData, setQuizData] = useState<FinalQuizStructure | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const data = await fetchFinalQuizWithQuestions(courseId);
                setQuizData(data);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [courseId]);

    return { quizData, loading };
};