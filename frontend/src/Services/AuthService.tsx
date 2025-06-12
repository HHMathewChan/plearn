import type { AuthenticationResponse, Credentials } from '../Types/AuthenticationType';

const API_BASE_URL = 'http://localhost:3001/api/student-routes';

/**
 * Implement AuthToken class using an object literal that manages the authentication token in session storage.
 */
export const AuthToken = {
    set(token: string) { return sessionStorage.setItem("token", token); },
    get() { return sessionStorage.getItem("token"); },
    remove() { return sessionStorage.removeItem("token"); }
};

export async function LoginRequest(credentials: Credentials): Promise<AuthenticationResponse> {
    try{
        const response = await fetch(`${API_BASE_URL}/students/email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        if (!response.ok) throw new Error(`Authentication failed: ${response.status}`);
        return await response.json();
    }
    catch (error) {
        throw new Error(`Login request failed: ${error}`);
    }
}

/**
 * Implements the login service class in an object literail that handles user authentication.
 */
export const AuthService = {
    async login(credentials: Credentials): Promise<string> {
        const data = await LoginRequest(credentials);
        AuthToken.set(data.token);
        return data.token;
    },
    isAuthenticated(): boolean {
        // Check if the token exists in session storage, if it does, the user is authenticated.
        return AuthToken.get() !== null;
    }
}
