<script lang="ts">
	import type { ServerI } from '$lib/types';
	import { servers, selectedServer } from '$lib/stores';
	export let setSelectedServer: (server: ServerI) => void;
</script>

<header>
	<nav class="navbar fixed-top navbar-dark bg-dark navbar-expand-lg">
		<div class="container-fluid d-flex align-content-between">
			<div class="d-flex">
				<a class="navbar-brand d-none d-md-block" href="/">Discreetly</a>
				<div class="collapse navbar-collapse" id="navbarText">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<a class="navbar-brand d-block d-md-none" href="/">Discreetly</a>
						<li class="nav-item">
							<a href="/" class="nav-link">Home</a>
						</li>
						<li class="nav-item">
							<a href="/chat" class="nav-link">Chat</a>
						</li>
						<li class="nav-item d-block d-lg-none">
							<a href="/signup" class="nav-link">Signup</a>
						</li>
						<li class="nav-item d-block d-lg-none">
							<a href="/login" class="nav-link">Login</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="navbar-brand dropdown" id="server-title">
				<a
					class="nav-link dropdown-toggle"
					href="#"
					role="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					{$selectedServer.name}
				</a>
				<ul class="dropdown-menu">
					{#each $servers as server}
						<li>
							<div
								aria-label={'select ' + server.name}
								class="dropdown-item"
								on:click={() => setSelectedServer(server)}
								on:keydown={(event) => {
									if (event.key === 'Enter' || event.key === ' ') {
										setSelectedServer(server);
									}
								}}
								role="button"
								tabindex="0"
							>
								{server.name}
							</div>
						</li>
					{/each}
				</ul>
			</div>
			<div>
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item d-none d-lg-block">
						<a href="/signup" class="nav-link">Signup</a>
					</li>
					<li class="nav-item d-none d-lg-block">
						<a href="/login" class="nav-link">Login</a>
					</li>
				</ul>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarText"
					aria-controls="navbarText"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon" />
				</button>
			</div>
		</div>
	</nav>
</header>

<style>
	.navbar-dark .navbar-brand {
		color: var(--orangered);
	}
	#server-title {
		font-family: 'Space Mono';
		color: var(--steel-light);
	}

	.nav-link {
		color: var(--steel);
	}
</style>
