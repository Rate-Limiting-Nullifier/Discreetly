<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import AppHeader from './AppHeader.svelte';
	import AppFooter from './AppFooter.svelte';
	import { identityStore, serverListStore, serverDataStore, selectedServer } from '$lib/stores';
	import { Identity } from '@semaphore-protocol/identity';
	import type { ServerI } from '$lib/types';
	import { fetchServer } from '$lib/utils';

	(BigInt.prototype as any).toJSON = function () {
		return this.toString();
	};

	function setSelectedServer(server: number) {
		console.debug('setting selected server');
		selectedServer.set(server);
	}

	onMount(async () => {
		$serverListStore.forEach((server: string) => {
			console.log('fetching server data');
			fetchServer(server).then((data) => {
				console.log('setting server data');
				console.log(data);
				console.log(server);
				$serverDataStore[server] = data as ServerI;
				console.log($serverDataStore);
			});
		});
		if ($selectedServer.name == undefined) {
			$selectedServer = $serverListStore[0];
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
		margin-top: calc(52px);
	}
</style>
