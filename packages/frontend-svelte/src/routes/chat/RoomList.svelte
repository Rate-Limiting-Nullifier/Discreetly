<script lang="ts">
	import type { RoomGroupI, RoomI } from '$lib/types';
	import { selectedServer } from '$lib/stores';

	$: roomGroups = $selectedServer.roomGroups;

	export let selectRoom: (room: RoomI) => any;

	function getMembers(room: RoomI): string {
		let total: number | string = '0';
		total = room.membership?.identityCommitments?.length || '?';
		return total.toString();
	}
</script>

<div class="col">
	<h4>Pick a chat room</h4>
	<section id="roomList">
		{#each roomGroups as group}
			<h5 class="mt-4">{group.name}</h5>
			<ul class="list-group">
				{#each group.rooms as room, index}
					<div class="card mb-3" style="width: 18rem;">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div class="card-body" on:click={selectRoom(room)}>
							<h5 class="card-title">{room.name}</h5>
							<p class="card-text">Members: {getMembers(room)}</p>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<div on:click={selectRoom(room)} class="btn btn-primary">Join</div>
						</div>
					</div>
				{/each}
			</ul>
		{/each}
	</section>
</div>
