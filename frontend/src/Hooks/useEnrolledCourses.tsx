import { useEffect, useState } from "react";
import type { EnroledCoursesWithMetaData } from "../Types/StudentType";
import { getEnrolledCourses } from "../Services/StudentService";

/**
 * Custom hook for managing enrolled courses data.
 * @returns {Object} An object containing enrolled courses, loading state, and error state.
 */
export function useEnrolledCourses() {
    const [enrolledCoursesWithMetaData, setEnrolledCoursesWithMetaData] = useState<EnroledCoursesWithMetaData>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch enrolled courses from the service
    const fetchEnrolledCourses = async () => {
        try {
            setLoading(true);
            setError(null);
            const enrolledCoursesWithMetaData = await getEnrolledCourses();
            setEnrolledCoursesWithMetaData(enrolledCoursesWithMetaData);
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
        enrolledCoursesWithMetaData, 
        loading, 
        error, 
        refreshEnrolledCourses 
    };
}