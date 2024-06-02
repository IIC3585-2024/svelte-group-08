import { writable } from 'svelte/store';

interface User {
    email: string;
    password: string;
}


export const user = writable(null);
export const loggedIn = writable(false);

export async function login(username: string, password: string) {
    try {
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            
            throw new Error(errorData.error || 'Failed to login');
        }


        const userData = await response.json();
        user.set(userData);
        loggedIn.set(true);
        localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

export function logout() {
    user.set(null);
    loggedIn.set(false);
    localStorage.removeItem('user');
}

export function initializeUser() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        user.set(JSON.parse(storedUser));
        loggedIn.set(true);
    }
}

export async function register(username: string, email: string, password: string): Promise<void> {
    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to register');
        }

        const userData = await response.json();
        user.set(userData);
        loggedIn.set(true);
        localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}
