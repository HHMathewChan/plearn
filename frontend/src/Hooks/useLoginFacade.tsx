/**
 * The file contains a custom React hook for the login facade.
 * It just manages the authentication state.
 */
import { useState, useEffect } from 'react';
import { AuthService } from '../Services/AuthService';

export const useLoginFacade = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(AuthService.isAuthenticated());
    
    // Update authentication state one time in case it changes
    useEffect(() => {
        setIsAuthenticated(AuthService.isAuthenticated());
    }, []);
    
    const updateAuthenticationState = () => {
        setIsAuthenticated(AuthService.isAuthenticated());
    };
    
    return {
        isAuthenticated,
        setIsAuthenticated,
        updateAuthenticationState
    };
};
