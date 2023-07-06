import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { ServerI } from '$lib/types';

export const servers: Writable<ServerI[]> = writable([]);

export const selectedServer: Writable<ServerI> = writable({
	name: 'Loading',
	serverInfoEndpoint: '',
	roomGroups: []
});
