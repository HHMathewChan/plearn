import type {RegisterDetails} from '../Types/RegisterUCType';

/**
 * 
 * @returns response object containing student_code which is a string
 */
const RegisterStudent = async (details: RegisterDetails) => {
    const response = await fetch('http://localhost:3001/api/student-routes/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(details)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
};

export default RegisterStudent;