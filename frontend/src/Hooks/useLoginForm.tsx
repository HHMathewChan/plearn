/**
 * This file is for the hooks that manage the login form state and logic.
 */
import { useState } from 'react';
import { AuthService } from '../Services/AuthService';
import type { Credentials,AuthenticationResponse } from '../Types/AuthenticationType';
import { Login } from '../UseCases/Login';

export const useLoginForm = () => {
    const [loginDetails, setloginDetails] = useState<Credentials>({
        email: '',
        password: '' 
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [authResponse, setAuthResponse] = useState<AuthenticationResponse | null>(null);

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
            // Call the login function with current loginDetails
            const response = await Login(loginDetails);
            setAuthResponse(response);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Login failed'); // Set error message if login fails
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return {
        loginDetails,
        isLoading,
        error,
        authResponse,
        handleChange,
        handleSubmit,
        hasCompleteSession: AuthService.hasCompleteSession()
    };
};