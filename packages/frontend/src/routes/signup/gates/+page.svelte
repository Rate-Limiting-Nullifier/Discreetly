<script lang="ts">
	import Card from '$lib/card.svelte';

	let links = [
		{
			link: '/signup/ceremony',
			text: 'Continue ➡',
			class: 'btn-primary'
		}
	];
	let code = '';

	function addCode(code: string) {
		console.log(code);
	}
</script>

<Card title="Join Communities">
	Invite Code: <input
		type="text"
		placeholder="Invite Code"
		bind:value={code}
		on:keydown={(event) => {
			if (event.key === 'Enter') {
				event.preventDefault();
				addCode(code);
				code = '';
			} else if (event.key === ' ' || event.key === '-') {
				event.preventDefault();
				if (code.length > 0 && code[code.length - 1] !== '-') {
					code += '-';
				}
			}
		}}
	/>
</Card>
