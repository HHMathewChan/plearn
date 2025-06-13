import type {RegisterDetails} from '../Types/RegisterUCType';

const API_BASE_URL = 'http://localhost:3001/api/platform-user-routes';

/**
 * 
 * @returns response object containing student_code which is a string
 */
const RegisterPlatformUser = async (details: RegisterDetails) => {
    const response = await fetch(`${API_BASE_URL}/platform-users`, {
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

export default RegisterPlatformUser;