import { writable } from 'svelte/store';

type User = {
    id: string;
    name: string;
    selected?: boolean;
};


export const isOpen = writable(false);
export const users = writable<User[]>([]);
export const recommendation = writable("");

export async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3000/users/getAll');
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        const formattedUsers = data.users.map((user: { id: any; username: any; }) => ({
            id: user.id,
            name: user.username,
            selected: false
        }));
        users.set(formattedUsers);
    } catch (error) {
        console.error(error);
        users.set([]);
    }
}

export async function postRecommendation(userWhoRecommendsId: number, userWhoGetsRecommendedId: number, content: string, bookKey: string) {

    try {
        const response = await fetch('http://localhost:3000/recomendations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userWhoRecomendsId: userWhoRecommendsId,
                userWhoGetsRecomendedId: userWhoGetsRecommendedId,
                content,
                key: bookKey
            })
        });
        if (!response.ok) {
            throw new Error('Failed to post recommendation');
        }
        const newRecommendation = await response.json();
        console.log('New recommendation:', newRecommendation);
    } catch (error) {
        console.error('Error posting recommendation:', error);
    }
}