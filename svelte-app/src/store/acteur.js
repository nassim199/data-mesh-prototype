import { writable } from 'svelte/store';

export const acteur = writable({
    id: "",
    email: "",
    authenticated: false
});

export const accessToken = writable("");