import { AuthToken } from "./AuthToken";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

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
        `${API_BASE}/course-content-routes/${courseId}/course-contents`,
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

/**
 * 
 * @param contentId - The unique identifier for the course content
 * @returns A promise that resolves to an object containing the signed URL
 */
export const getSignedContentUrl = async (contentId: string): Promise<{ signedUrl: string}> => {
    try {
        const response = await fetch(`${API_BASE}/course-content-routes/course-contents/${contentId}/signed-url`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to get signed URL: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('The response is:', result);
        return result;
    } catch (error) {
        console.error('Error fetching signed URL:', error);
        throw error;
    }
};