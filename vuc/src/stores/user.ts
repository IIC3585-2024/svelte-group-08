import { writable } from 'svelte/store';

interface User {
    email: string;
    password: string;
}

export const user = writable<User | null>(null);

export const loggedIn = writable<boolean>(false);
