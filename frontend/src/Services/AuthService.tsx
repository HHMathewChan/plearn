import type { AuthenticationResponse, Credentials } from '../Types/AuthenticationType';

const API_BASE_URL = 'http://localhost:3001/api/platform-user-routes';

/**
 * Implement AuthToken class using an object literal that manages the authentication token in session storage.
 */
export const AuthToken = {
    set(token: string) { return sessionStorage.setItem("authToken", token); },
    get() { return sessionStorage.getItem("authToken"); },
    remove() { return sessionStorage.removeItem("authToken"); }
};

/**
 * Implement UserData class using an object literal to manage user information in session storage.
 */
export const UserData = {
    setUserId(userId: string) { 
        return sessionStorage.setItem("userId", userId); 
    },
    getUserId() { 
        return sessionStorage.getItem("userId"); 
    },
    setUserRole(role: string) { 
        return sessionStorage.setItem("userRole", role); 
    },
    getUserRole() { 
        return sessionStorage.getItem("userRole"); 
    },
    setUserData(userId: string, role: string) {
        this.setUserId(userId);
        this.setUserRole(role);
    },
    removeUserId() { 
        return sessionStorage.removeItem("userId"); 
    },
    removeUserRole() { 
        return sessionStorage.removeItem("userRole"); 
    },
    removeUserData() {
        this.removeUserId();
        this.removeUserRole();
    },
    // Check if user data exists
    hasUserData(): boolean {
        return this.getUserId() !== null && this.getUserRole() !== null;
    }
};

export async function LoginRequest(credentials: Credentials): Promise<AuthenticationResponse> {
    try{
        const response = await fetch(`${API_BASE_URL}/platform-users/email`, {
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
 * Implements the login service class in an object literal that handles user authentication.
 */
export const AuthService = {
    async login(credentials: Credentials): Promise<string> {
        const data = await LoginRequest(credentials);
        AuthToken.set(data.token);
        
        // Store user ID and role using the separate UserData object
        if (data.platform_user_id && data.role) {
            UserData.setUserData(data.platform_user_id, data.role);
        }
        
        return data.token;
    },
    isAuthenticated(): boolean {
        // Check if the token exists in session storage, if it does, the user is authenticated.
        return AuthToken.get() !== null;
    },
    
    // Methods to get user data via UserData object
    getUserId(): string | null {
        return UserData.getUserId();
    },
    getUserRole(): string | null {
        return UserData.getUserRole();
    },
    
    // Check if user has complete authentication data
    hasCompleteSession(): boolean {
        return this.isAuthenticated() && UserData.hasUserData();
    },
    
    // Logout method to clear all data
    logout(): void {
        AuthToken.remove();
        UserData.removeUserData();
    }
};