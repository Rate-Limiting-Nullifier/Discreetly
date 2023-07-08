<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import type { ServerI } from '$lib/types';
	import AppHeader from './AppHeader.svelte';
	import AppFooter from './AppFooter.svelte';
	import { identityStore, serverListStore, serverDataStore, selectedServer } from '$lib/stores';
	import { randomBigInt } from '$lib/utils';
	import { Identity } from '@semaphore-protocol/identity';

	(BigInt.prototype as any).toJSON = function () {
		return this.toString();
	};

	function setSelectedServer(server: number) {
		console.debug('setting selected server');
		selectedServer.set(server);
	}

	onMount(async () => {
		console.info('Fetching server config');
		$serverListStore.forEach((server, index) => {
			console.debug(`Fetching server ${server}`);
			fetch(server, {
				method: 'GET',
				headers: {
					'Access-Control-Allow-Origin': 'http://localhost:*'
				}
			})
				.then(async (response) => {
					$serverDataStore[index] = await response.json();
					console.debug($serverDataStore[index]);
				})
				.catch((err) => {
					console.error(err);
				});
		});
		if ($selectedServer.name == undefined) {
			console.debug('setting selected server');
			$selectedServer = 0;
		}
	});

	if ($identityStore.length != 2) {
		console.log('MAKING UP SECRETS');
		$identityStore = new Identity();
	}
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
