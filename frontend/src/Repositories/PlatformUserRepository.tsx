/**
 * This file is meant to manage the platform user data that interact with any type of storage (sessionStorage, localStorage, etc.)
 */
import { SessionStorageManager } from '../Services/SessionStorageManager';

const PLATFORM_USER_ID_KEY = 'platformUserId';
const PLATFORM_USER_ROLE_KEY = 'platformUserRole';
const STUDENT_CODE_KEY = 'studentCode';

/**
 * Repository pattern implementation for managing platform user data storage.
 * Handles all platform user data persistence operations.
 */
export const PlatformUserRepository = {
    setPlatformUserId(platformUserId: string): void {
        SessionStorageManager.setItem(PLATFORM_USER_ID_KEY, platformUserId);
    },
    
    getPlatformUserId(): string | null {
        return SessionStorageManager.getItem(PLATFORM_USER_ID_KEY);
    },
    
    setPlatformUserRole(role: string): void {
        SessionStorageManager.setItem(PLATFORM_USER_ROLE_KEY, role);
    },
    
    getPlatformUserRole(): string | null {
        return SessionStorageManager.getItem(PLATFORM_USER_ROLE_KEY);
    },
    
    setStudentCode(studentCode: string): void {
        SessionStorageManager.setItem(STUDENT_CODE_KEY, studentCode);
    },
    
    getStudentCode(): string | null {
        return SessionStorageManager.getItem(STUDENT_CODE_KEY);
    },
    
    setPlatformUserData(platformUserId: string, role: string, studentCode?: string): void {
        this.setPlatformUserId(platformUserId);
        this.setPlatformUserRole(role);
        if (studentCode) {
            this.setStudentCode(studentCode);
        }
    },
    
    removePlatformUserId(): void {
        SessionStorageManager.removeItem(PLATFORM_USER_ID_KEY);
    },
    
    removePlatformUserRole(): void {
        SessionStorageManager.removeItem(PLATFORM_USER_ROLE_KEY);
    },
    
    removeStudentCode(): void {
        SessionStorageManager.removeItem(STUDENT_CODE_KEY);
    },
    
    removePlatformUserData(): void {
        this.removePlatformUserId();
        this.removePlatformUserRole();
        this.removeStudentCode();
    },
    
    hasPlatformUserData(): boolean {
        return this.getPlatformUserId() !== null && 
               this.getPlatformUserRole() !== null && 
               this.getStudentCode() !== null;
    }
};