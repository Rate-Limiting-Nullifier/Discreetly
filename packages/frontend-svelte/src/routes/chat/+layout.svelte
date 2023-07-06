<script lang="ts">
	import RoomList from './RoomList.svelte';
	import type { ServerI } from '$lib/types';
	import { servers, selectedServer } from '$lib/stores';

	let room = $selectedServer.roomGroups
		.map((group) => group.rooms)
		.flat()
		.find((room) => room.id === $selectedServer.selectedRoom);

	function selectRoom(id: ServerI['selectedRoom']) {
		$selectedServer.selectedRoom = id;
		console.log('selectRoom');
	}
</script>

<div class="container-fluid">
	<RoomList roomGroups={$selectedServer.roomGroups} {selectRoom} />
	<slot />
</div>
