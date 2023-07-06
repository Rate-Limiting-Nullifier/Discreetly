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
		const temp_room = $selectedServer.roomGroups
			.map((group) => group.rooms)
			.flat()
			.find((room) => room.id === id);

		if (temp_room) {
			console.debug('Setting Room to Selected', temp_room.name);
			room = temp_room;
		} else if ($selectedServer.roomGroups[0]) {
			console.debug('Setting Room to Default');
			room = $selectedServer.roomGroups[0].rooms[0];
		} else {
			console.debug('Loading Rooms Still');
			room = {
				id: '0',
				name: 'Loading',
				membership: { identityCommitments: [0n] }
			};
		}
	}

	$: selectedServer.subscribe((server) => {
		if (server) {
			setRoom($selectedServer.selectedRoom as string);
		}
	});

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
