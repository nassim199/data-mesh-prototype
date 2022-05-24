import { writable } from 'svelte/store';

export const acteur = writable({
    id: "",
    email: ""
});

export const accessToken = writable("");