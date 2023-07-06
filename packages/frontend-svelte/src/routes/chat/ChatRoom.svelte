<script lang="ts">
	import { selectedServer } from '$lib/stores';
	import type { RoomI } from '$lib/types';
	import { io } from 'socket.io-client';
	export let room: RoomI | undefined = undefined;

	const socketURL: string =
		room?.messageHandlerSocket || $selectedServer.messageHandlerSocket || '';
	console.log(socketURL);
	const socket = io(socketURL);
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
