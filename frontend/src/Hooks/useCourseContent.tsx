// filepath: /Users/mathewchan/plearn/frontend/src/Hooks/useCourseContent.tsx
import { useEffect, useState } from "react";
import { getCourseContent, type CourseContent } from "../Services/CourseContentService";

/**
 * Custom hook for managing course content data.
 * @param {string} courseId - The unique identifier for the course
 * @returns {Object} An object containing course content, loading state, and error state
 */
export function useCourseContent(courseId: string) {
    const [courseContent, setCourseContent] = useState<CourseContent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!courseId) {
            setError('Course ID is required');
            setLoading(false);
            return;
        }

        const fetchCourseContent = async () => {
            try {
                setLoading(true);
                setError(null);
                const content = await getCourseContent(courseId);
                setCourseContent(content);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch course content');
                console.error('Error fetching course content:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseContent();
    }, [courseId]);

    return { courseContent, loading, error };
}