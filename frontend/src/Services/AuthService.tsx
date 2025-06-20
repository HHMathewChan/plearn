import type { AuthenticationResponse, Credentials } from '../Types/AuthenticationType';
import { AuthToken } from './AuthToken';
import { PlatformUserRepository } from '../Repositories/PlatformUserRepository';

const API_BASE_URL = 'http://localhost:3001/api/platform-user-routes';

/**
 * Handles login API requests to the backend authentication service.
 */
export async function LoginRequest(credentials: Credentials): Promise<AuthenticationResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/platform-users/email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        
        if (!response.ok) {
            throw new Error(`Authentication failed: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        throw new Error(`Login request failed: ${error}`);
    }
}

/**
 * Main authentication service that orchestrates login, logout, and session management.
 * Follows the facade pattern by providing a simplified interface to authentication operations.
 */
export const AuthService = {
    async login(credentials: Credentials): Promise<string> {
        const data = await LoginRequest(credentials);
        AuthToken.set(data.token);

        // Store platform user data using the repository
        if (data.platform_user_id && data.role) {
            PlatformUserRepository.setPlatformUserData(
                data.platform_user_id, 
                data.role, 
                data.role_code
            );
        }
        
        return data.token;
    },
    
    isAuthenticated(): boolean {
        return AuthToken.exists();
    },
    
    getPlatformUserId(): string | null {
        return PlatformUserRepository.getPlatformUserId();
    },
    
    getPlatformUserRole(): string | null {
        return PlatformUserRepository.getPlatformUserRole();
    },
    
    getStudentCode(): string | null {
        return PlatformUserRepository.getStudentCode();
    },
    
    hasCompleteSession(): boolean {
        return this.isAuthenticated() && PlatformUserRepository.hasPlatformUserData();
    },
    
    logout(): void {
        AuthToken.remove();
        PlatformUserRepository.removePlatformUserData();
    }
};