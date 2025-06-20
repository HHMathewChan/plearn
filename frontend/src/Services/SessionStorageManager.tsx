/**
 * This file is meant to provide session storage operations
 */
export const SessionStorageManager = {
    setItem(key: string, value: string): void {
        sessionStorage.setItem(key, value);
    },
    
    getItem(key: string): string | null {
        return sessionStorage.getItem(key);
    },
    
    removeItem(key: string): void {
        sessionStorage.removeItem(key);
    },
    
    clear(): void {
        sessionStorage.clear();
    },
    
    hasItem(key: string): boolean {
        return this.getItem(key) !== null;
    }
};