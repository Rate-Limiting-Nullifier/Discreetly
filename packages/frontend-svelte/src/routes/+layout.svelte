<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import AppHeader from './AppHeader.svelte';
	import AppFooter from './AppFooter.svelte';
	import { identityStore, serverListStore, serverDataStore, selectedServer } from '$lib/stores';
	import { Identity } from '@semaphore-protocol/identity';

	(BigInt.prototype as any).toJSON = function () {
		return this.toString();
	};

	function setSelectedServer(server: number) {
		console.debug('setting selected server');
		selectedServer.set(server);
	}

	onMount(async () => {
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
				})
				.catch((err) => {
					console.error(err);
				});
		});
		if ($selectedServer.name == undefined) {
			$selectedServer = 0;
		}
	});

	// TODO THIS IS ONLY FOR DEVELOPMENT AND SHOULD BE REMOVED AFTER SIGNUP IS SETUP
	if (!$identityStore['_nullifier']) {
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
