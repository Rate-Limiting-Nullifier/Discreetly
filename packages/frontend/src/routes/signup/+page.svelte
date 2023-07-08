<script lang="ts">
	import Card from '$lib/card.svelte';
	let links = [
		{
			link: '/about',
			text: 'Read More',
			class: 'btn-secondary'
		},
		{
			link: '/signup/gates',
			text: 'Continue ➡',
			class: 'btn-primary'
		}
	];
	let content = `This app is a little different from what you're used to.`;
</script>

<Card title="Welcome to Discreetly" {content} buttons={links} />
