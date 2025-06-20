/**
 * This file provides a simplified interface for the login functionality, encapsulating the complexity of the underlying services and hooks.
 * It combines the hooks and the LoginForm component to provide a complete login experience.
 * It is the entry point for the login use case in the application.
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