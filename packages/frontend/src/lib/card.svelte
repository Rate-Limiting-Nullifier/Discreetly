<script lang="ts">
	export let title: string;
	export let content: string;
	export let buttons: button[];

	interface button {
		link: string;
		text: string;
		class?: string;
	}
</script>

<div class="m-4 px-5 py-4 text-center bg-body-tertiary rounded-2">
	<h2 class="text-body-emphasis m-3">{title}</h2>
	<div class="col-lg-8 mx-auto fs-5 text-muted">
		{@html content}
	</div>
	<div class="d-inline-flex gap-5 my-3">
		{#each buttons as button}
			<a
				href={button.link}
				class="btn btn-lg px-4 d-inline-flex align-items-center {button.class
					? button.class
					: 'btn-primary'}"
				type="button"
			>
				{button.text}
			</a>
		{/each}
	</div>
</div>
