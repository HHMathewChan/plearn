/**
 * This file is the implementation of the login use case in the application.
 * This will trigger by the handle submit of the login form.
 * It will call the AuthService to authenticate the user and manage the session.
 * It will set the platform user data in the PlatformUserRepository.
 * It will ask the AuthService if the user is authenticated and has a complete session.
 * It will ask the PlatformUserRepository to set the platform user data
 * I will redirect the user to the student home page if the user is authenticated.
 */
import { LoginRequest } from "../Services/AuthService";
import { AuthToken } from "../Services/AuthToken";
import { PlatformUserRepository } from "../Repositories/PlatformUserRepository";
import { type AuthenticationResponse } from "../Types/AuthenticationType";
import type { Credentials } from "../Types/AuthenticationType";

export const Login = async (credentials: Credentials) => {
    try {
        // Call the loginquest to authenticate the user
        const response: AuthenticationResponse = await LoginRequest(credentials);
        // Check if the response is valid
        if (!response || !response.token) {
            throw new Error("Invalid response from login request");
        }
        // Set the authentication token in the AuthToken
        AuthToken.set(response.token);
        // Validate the response
        if (!response.platform_user_id || !response.role || !response.role_code) {
            throw new Error("Invalid response from login request");
        }
        // Set the platform user data in the PlatformUserRepository
        PlatformUserRepository.setPlatformUserData(
            response.platform_user_id,
            response.role,
            response.role_code
        );
        // Return the complete response
        return response;
    } catch (error) {
        console.error("Login failed:", error);
        // Handle login failure (by showing an error message)
        throw new Error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};