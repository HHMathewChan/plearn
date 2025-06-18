/**
 * This file is for the useLogin hook.
 * It handles all the logic and status related to user login.
 * This is implementation of the business layer of the login use case. 
 */
import { useState } from 'react';
import { AuthService, UserData } from '../Services/AuthService';
import type { Credentials } from '../Types/AuthenticationType';

export const useLogin = () => {
    const [loginDetails, setloginDetails] = useState<Credentials>({
        email: '',
        password: '' 
    });
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(AuthService.isAuthenticated());
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    //handle change in the input fields
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // Update the loginDetails state with the new value, previous details of the login form are passed to the function
        setloginDetails(previousDetails => ({
            // Spread the previous details and update the specific field
            ...previousDetails,
            [name]: value
        }));
    };

    //handle the submit of the login form
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission behaviour
        setIsLoading(true); // Set loading state to true
        setError(null); // Reset any previous error

        try {
            // Call the login method from AuthService with the current loginDetails
            const token = await AuthService.login(loginDetails);
            setIsAuthenticated(true); // Update authentication status
            console.log('Login successful, token:', token);
            console.log('User ID:', UserData.getUserId());
            console.log('User role:', UserData.getUserRole());
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed'); // Set error message if login fails
            setIsAuthenticated(false); // Ensure authentication status is false on error
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    // Logout handler
    const handleLogout = () => {
        AuthService.logout();
        setIsAuthenticated(false);
        setloginDetails({ email: '', password: '' });
        setError(null);
    };

    return {
        loginDetails,
        isAuthenticated,
        isLoading,
        error,
        handleChange,
        handleSubmit,
        handleLogout,
        userId: UserData.getUserId(),
        userRole: UserData.getUserRole(),
        studentCode: UserData.getStudentCode(),
        hasCompleteSession: AuthService.hasCompleteSession()
    };
}