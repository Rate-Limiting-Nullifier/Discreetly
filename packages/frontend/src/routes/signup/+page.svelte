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
</script>

<Card title="Welcome to Discreetly" buttons={links}>
	This app is a little different from what you're used to.
</Card>
