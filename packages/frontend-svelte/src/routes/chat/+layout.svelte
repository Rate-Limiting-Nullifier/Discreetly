<script lang="ts">
	import RoomList from './RoomList.svelte';
	import type { ServerI } from '$lib/types';

	export let server: ServerI;

	let room = server.roomGroups
		.map((group) => group.rooms)
		.flat()
		.find((room) => room.id === server.selectedRoom);

	function selectRoom(id: ServerI['selectedRoom']) {
		server.selectedRoom = id;
		console.log('selectRoom');
	}
</script>

<div class="container-fluid">
	<RoomList roomGroups={server.roomGroups} {selectRoom} />
	<slot {server} />
</div>
