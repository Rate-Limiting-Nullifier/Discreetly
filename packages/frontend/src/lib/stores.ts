import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// This is just a list of endpoints of servers to connect to, no other information, this is mainly for bootstraping the app
export const serverListStore = storable(['http://localhost:3001/api/'], 'servers');

// This is what gets populated after querying the serverListStore, with the server's information, public rooms available, etc.
export const serverDataStore = storable({}, 'serverData');

// JUST an index to the serverDataStore, so we can keep track of which server we're currently connected to
export const selectedServer = storable({}, 'selectedServer');

// Session store (removed after the session is cleared) of the last 500 messages or so of each room the user participates in; rooms they don't have selected will not be updated
export const messageStore = sessionable({}, 'messages');

// Stores the user's identity // TODO THIS NEEDS TO BE AN ENCRYPTED SEMAPHORE IDENTITY IN THE FUTURE
export const identityStore = storable({}, 'identity');

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
