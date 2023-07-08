<script lang="ts">
	import type { ButtonI } from './types';
	export let button: ButtonI;
</script>

<a
	href={button.link}
	class="btn btn-lg px-4 d-inline-flex align-items-center {button.class
		? button.class
		: 'btn-primary'}"
	type="button"
>
	{button.text}
</a>
