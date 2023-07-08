<script lang="ts">
	import Card from '$lib/card.svelte';
	let links = [
		{
			link: '/chat',
			text: 'Skip Backup',
			class: 'btn-secondary'
		},
		{
			link: '/signup/backup',
			text: 'Backup Identity ➡',
			class: 'btn-primary'
		}
	];
	let content = `TODO`;
</script>

<Card title="Generate Your Identity" {content} buttons={links} />
