import { useEffect, useState } from "react";
import type { Courses } from "../Types/CourseType";
import { getEnrolledCourses } from "../Services/StudentService";

/**
 * Custom hook for managing enrolled courses data.
 * @returns {Object} An object containing enrolled courses, loading state, and error state.
 */
export function useEnrolledCourses() {
    const [enrolledCourses, setEnrolledCourses] = useState<Courses>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch enrolled courses from the service
    const fetchEnrolledCourses = async () => {
        try {
            setLoading(true);
            setError(null);
            const courses = await getEnrolledCourses();
            setEnrolledCourses(courses);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch enrolled courses');
            console.error('Error fetching enrolled courses:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnrolledCourses();
    }, []); // Empty dependency array - fetch once on mount

    const refreshEnrolledCourses = async () => {
        await fetchEnrolledCourses();
    };

    return { 
        enrolledCourses, 
        loading, 
        error, 
        refreshEnrolledCourses 
    };
}