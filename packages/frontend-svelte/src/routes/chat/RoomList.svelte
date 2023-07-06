<script lang="ts">
	import type { RoomGroupI } from '$lib/types';

	export let roomGroups: RoomGroupI[];
	export let selectRoom: (id: string) => void = () => {};
</script>

<h2>Pick a chat room</h2>
<section id="roomList">
	{#each roomGroups as group}
		<h3>{group.name}</h3>
		asdf
		<ul class="list-group">
			{#each group.rooms as room}
				<div class="card" style="width: 18rem;">
					<div class="card-body" on:click={selectRoom(room.id)}>
						<h5 class="card-title">{room.name}</h5>
						<p class="card-text">Members: {room.membership?.identityCommitments?.length}</p>
						<a href="/chat/{room.name}" class="btn btn-primary">Join</a>
					</div>
				</div>
			{/each}
		</ul>
	{/each}
</section>
