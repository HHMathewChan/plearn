const API_BASE_URL = 'http://localhost:3001/api/student-learning-preference-routes';

/**
 * Checks if a student has set their learning preferences.
 * @param studentCode - The unique code of the student.
 */
export const studentHasLearningPreferences = async (studentCode: string): Promise<any> => {
    try {
        const response = await fetch(`${API_BASE_URL}/student-learning-preference`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: "check",
                student_code: studentCode
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('At StudentLearningPreferenceService.tsx: Student has learning preferences:', data);
        return data;
    } catch (error) {
        console.error('At StudentLearningPreferenceService.tsx: Error checking learning preferences:', error);
        throw error;
    }
}