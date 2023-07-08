<script lang="ts">
	import { page } from '$app/stores';
	import { identityStore } from '$lib/stores';

	// TODO Check if Identity is created
	// TODO Check if Gates exist
</script>

<ul class="nav nav-underline d-flex justify-content-evenly mt-3 mb-4">
	<li class="nav-item">
		<a
			class="nav-link"
			class:active={!$page.route.id?.match(/gates|ceremony|backup/g)}
			class:complete={$page.route.id?.match(/gates|ceremony|backup/g)}
			aria-current="page"
			href="/signup">Sign Up</a
		>
	</li>
	<li class="nav-item">
		<a
			class="nav-link"
			href="/signup/gates"
			class:active={$page.route.id?.match(/gates/g)}
			class:complete={$page.route.id?.match(/ceremony|backup/g)}>Choose Communities</a
		>
	</li>
	<li class="nav-item">
		<a
			class="nav-link"
			href="/signup/ceremony"
			class:complete={$page.route.id?.match(/backup/g)}
			class:active={$page.route.id?.match(/ceremony/g)}>Create Identity</a
		>
	</li>
	<li class="nav-item">
		<a class="nav-link" href="/signup/backup" class:active={$page.route.id?.match(/backup/g)}
			>Backup Identity</a
		>
	</li>
</ul>

<div class="container-fluid">
	<div class="d-flex flex-column align-items-center">
		<slot />
	</div>
</div>

<style>
	.complete::after {
		content: '✓';
		padding-left: 0.5rem;
	}
</style>
