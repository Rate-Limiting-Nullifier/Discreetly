<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import type { ServerI } from '$lib/types';
	import AppHeader from './AppHeader.svelte';
	import AppFooter from './AppFooter.svelte';
	import { servers, selectedServer } from '$lib/stores';

	(BigInt.prototype as any).toJSON = function () {
		return this.toString();
	};

	function setSelectedServer(server: ServerI) {
		console.debug('setting selected server');
		selectedServer.set(server);
	}

	onMount(async () => {
		console.info('fetching servers');
		// TODO: Handle multiple servers
		fetch('http://localhost:3001/api/', {
			method: 'GET',
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		})
			.then(async (response) => {
				$servers[0] = await response.json();
				// TODO: Handle case where no servers are available or server is already selected in localstorage
				selectedServer.set($servers[0]);
			})
			.catch((err) => {
				console.error(err);
			});
	});

	// if (!localStorage.getItem('secrets')) {
	// 	console.log('MAKING UP SECRETS');
	// 	const nullifier = BigInt(Math.random() * 10000000000000);
	// 	const trapdoor = BigInt(Math.random() * 10000000000000);
	// 	localStorage.setItem(
	// 		'secrets',
	// 		JSON.stringify({
	// 			nullifier: nullifier,
	// 			trapdoor: trapdoor
	// 		})
	// 	);
	// }
</script>

<div class="d-flex flex-column align-content-between">
	<AppHeader {setSelectedServer} />
	<main class="container-fluid align-items-center align-self-stretch">
		<slot />
	</main>
	<AppFooter />
</div>

<style>
	main {
		margin-top: calc(0.5rem + 51px);
	}
</style>
