<script lang="ts">
	import RoomList from './RoomList.svelte';
	import type { RoomI } from '$lib/types';
	import { selectedServer } from '$lib/stores';
	import { goto } from '$app/navigation';

	let room = $selectedServer.roomGroups
		.map((group) => group.rooms)
		.flat()
		.find((room) => room.id === $selectedServer.selectedRoom);

	function selectRoom(room: RoomI) {
		$selectedServer.selectedRoom = room.id;
		goto(`/chat/${room.name}`);
	}
</script>

<div class="container-fluid">
	<div class="row">
		<RoomList {selectRoom} />
		<slot />
	</div>
</div>
