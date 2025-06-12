/**
 * This file is the implementation of the login use case using Facade pattern.
 * It provides a simplified interface for the login functionality, encapsulating the complexity of the underlying services and hooks.
 * It combines the useLogin hook and the LoginForm component to provide a complete login experience.
 * It is the entry point for the login use case in the application.
 * It handles the state management, input handling, and submission logic for the login form.
 * It is responsible for managing the login process, including handling loading states and errors.
 * It is the presentation layer of the login use case, providing a user-friendly interface for logging in.
 * It is used in the main application to render the login form and handle user authentication.
 */
import { Navigate } from 'react-router-dom';
import { useLogin } from '../Hooks/useLogin';
import { LoginForm } from '../Components/LoginForm';

export const LoginFacade: React.FC = () => {
    const { loginDetails,
            isAuthenticated, 
            isLoading,
            error,
            handleChange,
            handleSubmit
        } = useLogin();
    
    // Redirect to the Correct page if the user is already authenticated
    if (isAuthenticated) {
        return <Navigate to="/student-home" replace={true} />;
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