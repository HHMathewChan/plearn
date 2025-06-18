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
 * Implement PlatformUserData class using an object literal to manage platform user information in session storage.
 */
export const PlatformUserData = {
    setPlatformUserId(platformUserId: string) { 
        return sessionStorage.setItem("platformUserId", platformUserId); 
    },
    getPlatformUserId() { 
        return sessionStorage.getItem("platformUserId"); 
    },
    setPlatformUserRole(role: string) { 
        return sessionStorage.setItem("platformUserRole", role); 
    },
    getPlatformUserRole() { 
        return sessionStorage.getItem("platformUserRole"); 
    },
    setStudentCode(studentCode: string) {
        return sessionStorage.setItem("studentCode", studentCode);
    },
    getStudentCode() {
        return sessionStorage.getItem("studentCode");
    },
    setPlatformUserData(platformUserId: string, role: string, studentCode?: string) {
        this.setPlatformUserId(platformUserId);
        this.setPlatformUserRole(role);
        if (studentCode) {
            this.setStudentCode(studentCode);
        }
    },
    removePlatformUserId() { 
        return sessionStorage.removeItem("platformUserId"); 
    },
    removePlatformUserRole() { 
        return sessionStorage.removeItem("platformUserRole"); 
    },
    removeStudentCode() {
        return sessionStorage.removeItem("studentCode");
    },
    removePlatformUserData() {
        this.removePlatformUserId();
        this.removePlatformUserRole();
        this.removeStudentCode();
    },
    // Check if platform user data exists
    hasPlatformUserData(): boolean {
        return this.getPlatformUserId() !== null && this.getPlatformUserRole() !== null && this.getStudentCode() !== null;
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
 * Implements the login service class in an object literal that handles platform user authentication.
 */
export const AuthService = {
    async login(credentials: Credentials): Promise<string> {
        const data = await LoginRequest(credentials);
        AuthToken.set(data.token);

        // Store platform user ID, role and role_code using the separate PlatformUserData object
        // studentCode will be the role_code given that the platform user role is student
        if (data.platform_user_id && data.role) {
            PlatformUserData.setPlatformUserData(data.platform_user_id, data.role, data.role_code);
        }
        
        return data.token;
    },
    isAuthenticated(): boolean {
        // Check if the token exists in session storage, if it does, the platform user is authenticated.
        return AuthToken.get() !== null;
    },
    
    // Methods to get platform user data via PlatformUserData object
    getPlatformUserId(): string | null {
        return PlatformUserData.getPlatformUserId();
    },
    getPlatformUserRole(): string | null {
        return PlatformUserData.getPlatformUserRole();
    },
    getStudentCode(): string | null {
        return PlatformUserData.getStudentCode();
    },    
    // Check if platform user has complete authentication data
    hasCompleteSession(): boolean {
        return this.isAuthenticated() && PlatformUserData.hasPlatformUserData();
    },
    
    // Logout method to clear all data
    logout(): void {
        AuthToken.remove();
        PlatformUserData.removePlatformUserData();
    }
};