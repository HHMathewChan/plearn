/**
 * This file provides a simplified interface for the login functionality, encapsulating the complexity of the underlying services and hooks.
 * It combines the hooks and the LoginForm component to provide a complete login experience.
 * It is the entry point for the login use case in the application.
 * It handle the presentation logic.
 */
import { useLoginForm } from '../Hooks/useLoginForm';
import { LoginForm } from '../Components/LoginForm';
import { useLoginFacade } from '../Hooks/useLoginFacade';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

export const LoginFacade: React.FC = () => {
    const { loginDetails,
            isLoading,
            error,
            authResponse,
            handleChange,
            handleSubmit
        } = useLoginForm();

    const { isAuthenticated, updateAuthenticationState } = useLoginFacade();

    // Update the authentication state when the authResponse changes
    useEffect(() => {
        if (authResponse) {
            updateAuthenticationState();
        }
    }, [authResponse, updateAuthenticationState]);

    // if isAuthenticated Redirect to the corresponding page based on the user role
    if (isAuthenticated && authResponse) {
        if (authResponse?.role === 'student') {
            return <Navigate to="/student-home" replace={true} />;
        }
        // Add more role-based redirects here if needed
    }

    return (
        <LoginForm
            loginDetails={loginDetails}
            isLoading={isLoading}
            error={error}
            onInputChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
};