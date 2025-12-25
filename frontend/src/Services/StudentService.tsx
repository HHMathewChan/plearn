import { AuthToken } from './AuthToken';
import { PlatformUserRepository } from '../Repositories/PlatformUserRepository';
import type { EnroledCoursesWithMetaData } from '../Types/StudentType';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetches enrolled courses for the current student.
 * @returns {Promise<EnroledCoursesWithMetaData[]>} 
 * @throws {Error} Throws an error if the request fails or user is not authenticated.
 */
export async function getEnrolledCourses(): Promise<EnroledCoursesWithMetaData> {
    // Get the student code from the repository
    const studentCode = PlatformUserRepository.getStudentCode();
    
    if (!studentCode) {
        throw new Error('Student code not found. Please log in again.');
    }

    const token = AuthToken.get();
    if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
    }

    const response = await fetch(`${API_BASE}/student-routes/${studentCode}/enrolled-courses`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch enrolled courses');
    }

    return await response.json();
}