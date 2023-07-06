<script lang="ts">
	import type { RoomGroupI } from '$lib/types';

	export let roomGroups: RoomGroupI[];
	export let selectRoom: (id: string | bigint) => any;
</script>

<div class="col">
	<h4>Pick a chat room</h4>
	<section id="roomList">
		{#each roomGroups as group}
			<h5 class="mt-4">{group.name}</h5>
			<ul class="list-group">
				{#each group.rooms as room}
					<div class="card mb-3" style="width: 18rem;">
						<div class="card-body" on:click={selectRoom(room.id)}>
							<h5 class="card-title">{room.name}</h5>
							<p class="card-text">Members: {room.membership?.identityCommitments?.length}</p>
							<div
								on:click={selectRoom(room.name)}
								class="btn btn-primary"
								on:keydown|preventDefault={(e) => e.key === 'Enter' && selectRoom(room.id)}
								aria-label={`Join ${room.name} chat room`}
								aria-roledescription="button"
							>
								Join
							</div>
						</div>
					</div>
				{/each}
			</ul>
		{/each}
	</section>
</div>
