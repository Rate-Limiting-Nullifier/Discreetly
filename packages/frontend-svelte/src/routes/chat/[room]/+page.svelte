<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { RoomI, ServerI } from '$lib/types';

	import { selectedServer as server } from '$lib/stores';
	let room: RoomI | undefined;

	onMount(() => {
		let roomNamePath = $page.params.room;
		room = $server.roomGroups
			.map((group) => group.rooms)
			.flat()
			.find((room) => room.name === roomNamePath);
		if (!room) {
			console.log('no room, redirecting to /chat');
			goto('/chat');
		} else {
			$server.selectedRoom = room.id;
		}
	});
</script>

<div class="col-6 chat-room">
	<h3>{room?.name}</h3>
	<div class="chat-messages">
		<div class="chat-message">
			<p>
				<strong>internalNullfiier</strong>: message
			</p>
		</div>
	</div>
	<div class="chat-input">
		<input type="text" placeholder="Type your message here" />
	</div>
</div>
