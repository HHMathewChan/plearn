import { AuthToken } from "./AuthToken";

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Course content type definition
 */
export type CourseContent = {
    id: string;
    course_id: string;
    title: string;
    content_type: string;
    content_url: string;
};

/**
 * Fetches course content for a specific course.
 * @param {string} courseId - The unique identifier for the course
 * @returns {Promise<CourseContent[]>} A promise that resolves to an array of course content
 * @throws {Error} Throws an error if the request fails
 */
export async function getCourseContent(courseId: string): Promise<CourseContent[]> {
    const token = AuthToken.get();
    if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
    }

    const response = await fetch(
        `${API_BASE_URL}/course-content-routes/${courseId}/course-contents`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    if (!response.ok) {
        let errorMessage = 'Failed to fetch course content';
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
        } catch {
            errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.courseContent;
}