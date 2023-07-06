<script lang="ts">
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
				console.debug(servers);
				// TODO: Handle case where no servers are available or server is already selected in localstorage
				selectedServer.set($servers[0]);
			})
			.catch((err) => {
				console.error(err);
			});
	});
</script>

<div class="d-flex flex-column align-content-between">
	<AppHeader servers={$servers} selectedServer={$selectedServer} {setSelectedServer} />
	<main class="container-fluid align-items-center align-self-stretch">
		<slot />
	</main>
	<AppFooter />
</div>

<style>
	:root {
		--blackish: rgba(0, 0, 0, 0.98);
		--gray-dark: #212121;
		--gray-light: rgba(242, 242, 242, 0.6);
		--white: rgba(255, 255, 255, 1);
		--whitish: rgb(225, 225, 225);
		--steel: hsl(185, 18%, 50%);
		--steel-light: hsl(185, 18%, 66%);
		--steel-dark: hsl(185, 18%, 33%);
		--neon-green: #59f02b;
		--green: #19d457;
		--green-light: #61f291;
		--green-dark: #198754;
		--jade: #45a164;
		--hunter-green: #405c37;
		--dark-blue: #315db5;
		--blue: #477eed;
		--blue-light: #53d3e0;
		--blue-very-light: #a7f6ff;
		--violet: #9198e5;
		--violet-light: #b4bbff;
		--mauve: #cc71c2;
		--pink: #bf2c7f;
		--purple: #b638f5;
		--sunset: #ff7575;
		--sunset-light: #ffb585;
		--orangered: #fa5f5f;
		--max-red: #de1a1a;
		--yellow: #fad14b;
	}

	main {
		margin-top: calc(0.5rem + 51px);
	}
</style>
