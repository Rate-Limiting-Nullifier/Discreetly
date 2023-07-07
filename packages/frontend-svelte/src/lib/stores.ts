import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export function storable(data: any, storagePath = 'storable') {
	const store = writable(data);
	const { subscribe, set, update } = store;
	const isBrowser = typeof window !== 'undefined';

	isBrowser && localStorage[storagePath] && set(JSON.parse(localStorage[storagePath]));

	return {
		subscribe,
		set: (n: object | string | number) => {
			browser && (localStorage[storagePath] = JSON.stringify(n));
			set(n);
		},
		update: (cb) => {
			const updatedStore = cb(get(store));

			browser && (localStorage[storagePath] = JSON.stringify(updatedStore));
			set(updatedStore);
		}
	};
}

export function sessionable(data: any, storagePath = 'storable') {
	const store = writable(data);
	const { subscribe, set, update } = store;
	const isBrowser = typeof window !== 'undefined';

	isBrowser && sessionStorage[storagePath] && set(JSON.parse(sessionStorage[storagePath]));

	return {
		subscribe,
		set: (n: object | string | number) => {
			browser && (sessionStorage[storagePath] = JSON.stringify(n));
			set(n);
		},
		update: (cb) => {
			const updatedStore = cb(get(store));

			browser && (sessionStorage[storagePath] = JSON.stringify(updatedStore));
			set(updatedStore);
		}
	};
}

export const serverListStore = storable(['http://localhost:3001/api/'], 'servers');

export const serverDataStore = storable([], 'serverData');

export const selectedServer = storable({}, 'selectedServer');

export const messageStore = sessionable({}, 'messages');

export const identityStore = storable([], 'identity');
