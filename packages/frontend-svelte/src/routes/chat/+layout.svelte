<script lang="ts">
	import RoomList from './RoomList.svelte';
	import ChatRoom from './ChatRoom.svelte';
	import type { RoomGroupI, RoomI } from '$lib/types';
	import { serverDataStore, selectedServer } from '$lib/stores';
	import { onMount } from 'svelte';
	import { roomGroups } from '$lib/rooms';

	let room: RoomI;

	function selectRoom(id: RoomI['id']) {
		$serverDataStore[$selectedServer].selectedRoom = id;
		setRoom(id as string);
	}

	function setRoom(id: string) {
		const rooms = $serverDataStore[$selectedServer].roomGroups;
		const temp_room = rooms
			.map((group: RoomGroupI) => group.rooms)
			.flat()
			.find((room: RoomI) => room.id === id);

		if (temp_room) {
			console.debug('Setting Room to Selected', temp_room.name);
			room = temp_room;
		} else if ($serverDataStore[$selectedServer].roomGroups[0]) {
			console.debug('Setting Room to Default');
			room = $serverDataStore[$selectedServer].roomGroups[0].rooms[0];
		} else {
			console.debug('Loading Rooms Still');
			room = {
				id: '0',
				name: 'Rooms Not Loaded',
				membership: { identityCommitments: [0n] }
			};
		}
	}

	onMount(() => {
		setRoom($serverDataStore[$selectedServer].selectedRoom as string);
	});
</script>

<div class="container-fluid mt-2">
	<div class="row">
		<RoomList {selectRoom} />
		{#if room}
			<ChatRoom {room} />
		{:else}
			<slot />
		{/if}
	</div>
</div>
