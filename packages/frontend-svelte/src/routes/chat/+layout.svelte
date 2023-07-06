<script lang="ts">
	import RoomList from './RoomList.svelte';
	import ChatRoom from './ChatRoom.svelte';
	import type { RoomI } from '$lib/types';
	import { selectedServer } from '$lib/stores';
	import { onMount } from 'svelte';

	let room: RoomI;

	function selectRoom(id: RoomI['id']) {
		$selectedServer.selectedRoom = id;
		setRoom(id as string);
	}

	function setRoom(id: string) {
		console.debug('setRoom: ', id);
		const temp_rooms = $selectedServer.roomGroups.map((group) => group.rooms).flat();
		console.debug('temp_rooms: ', temp_rooms);
		const temp_room = temp_rooms.find((room) => (room.id as string) == (id as string));
		console.debug('temp_room: ', temp_room);

		if (temp_room) {
			room = temp_room;
		} else if ($selectedServer.roomGroups[0]) {
			room = $selectedServer.roomGroups[0].rooms[0];
		} else {
			room = {
				id: '0',
				name: 'Loading',
				membership: { identityCommitments: [0n] }
			};
		}
	}

	onMount(() => {
		setRoom($selectedServer.selectedRoom as string);
	});
</script>

<div class="container-fluid">
	<div class="row">
		<RoomList {selectRoom} />
		<ChatRoom {room} />
	</div>
</div>
