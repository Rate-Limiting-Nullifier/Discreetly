<script lang="ts">
	import Card from '$lib/card.svelte';
	let links = [
		{
			link: '/signup/ceremony',
			text: 'Continue ➡',
			class: 'btn-primary'
		}
	];
	let content = `TODO`;
</script>

<Card title="Join Communities" {content} buttons={links} />
