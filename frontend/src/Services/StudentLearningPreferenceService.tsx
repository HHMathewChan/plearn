import type {ChosenTopic,LearningModes, Topic } from '../Types/StudentLearningPreferenceType';
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

/**
 * Fetches data for the learning preferences survey, including available learning modes and topics.
 */
export const getDataForLearningPreferencesSurvey = async (): Promise<{learningModes: LearningModes[], topics: Topic[]}> => {
    try {
        const response = await fetch(`${API_BASE_URL}/student-learning-preference`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: "getSurveyData"
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('At StudentLearningPreferenceService.tsx: Fetched survey data:', data);
        const StudentLearningPreferenceSurveyData = data.result;
        console.log('At StudentLearningPreferenceService.tsx: Fetched survey data:', StudentLearningPreferenceSurveyData);
        return StudentLearningPreferenceSurveyData;
    } catch (error) {
        console.error('At StudentLearningPreferenceService.tsx: Error fetching survey data:', error);
        throw error;
    }
}

/**
 * Creates student learning preferences.
 */
export const createStudentLearningPreferences = async (studentCode: string, learningModeId: string, chosenTopics: ChosenTopic[]): Promise<any> => {
    try {
        const response = await fetch(`${API_BASE_URL}/student-learning-preference`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: "create",
                student_code: studentCode,
                learning_mode_id: learningModeId,
                topic_preferences: chosenTopics
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('At StudentLearningPreferenceService.tsx: Created student learning preferences:', data);
        const isSuccess = data.success;
        return isSuccess;
    } catch (error) {
        console.error('At StudentLearningPreferenceService.tsx: Error creating student learning preferences:', error);
        throw error;
    }
}