/**
 * This file is meant to handle auth token management
 */
import { SessionStorageManager } from './SessionStorageManager';

const AUTH_TOKEN_KEY = 'authToken';

/**
 * Manages authentication token storage and retrieval using session storage.
 */
export const AuthToken = {
    set(token: string): void {
        SessionStorageManager.setItem(AUTH_TOKEN_KEY, token);
    },
    
    get(): string | null {
        return SessionStorageManager.getItem(AUTH_TOKEN_KEY);
    },
    
    remove(): void {
        SessionStorageManager.removeItem(AUTH_TOKEN_KEY);
    },
    
    exists(): boolean {
        return SessionStorageManager.hasItem(AUTH_TOKEN_KEY);
    }
};