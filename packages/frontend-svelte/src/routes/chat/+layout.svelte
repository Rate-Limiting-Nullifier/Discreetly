<script lang="ts">
	import RoomList from './RoomList.svelte';
	import type { ServerI } from '$lib/types';
	import { servers, selectedServer } from '$lib/stores';
	import { goto } from '$app/navigation';

	let room = $selectedServer.roomGroups
		.map((group) => group.rooms)
		.flat()
		.find((room) => room.id === $selectedServer.selectedRoom);

	function selectRoom(id: ServerI['selectedRoom']) {
		$selectedServer.selectedRoom = id;
		goto(`/chat/${id}`);
	}
</script>

<div class="container-fluid">
	<div class="row">
		<RoomList roomGroups={$selectedServer.roomGroups} {selectRoom} />
		<slot />
	</div>
</div>
