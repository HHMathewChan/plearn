const API_BASE_URL = 'http://localhost:3001/api/enrolment-routes';

export async function enrols(studentCode: string, courseId: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/enrolments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ student_code: studentCode, course_id: courseId })
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Enrolment failed");
    }
    return response.json();
}