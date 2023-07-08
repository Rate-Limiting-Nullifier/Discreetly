<script lang="ts">
	import Card from '$lib/card.svelte';
	let links = [
		{
			link: '/chat',
			text: 'Start Chatting ➡',
			class: 'btn-primary'
		}
	];
	let content = `TODO`;
</script>

<Card title="Backup Your Identity" {content} buttons={links} />
