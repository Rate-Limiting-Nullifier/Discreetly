<script lang="ts">
	import { selectedServer } from '$lib/stores';
	import type { RoomI, MessageI } from '$lib/types';
	import { io } from 'socket.io-client';
	import { onDestroy } from 'svelte';

	import { RLNProver } from 'rlnjs';

	onDestroy(() => {
		socket.emit('leavingRoom', room?.id);
		socket.disconnect();
	});

	export let room: RoomI;

	let inputText = '';

	let messages = [] as MessageI[];

	const socketURL: string = $selectedServer.messageHandlerSocket || '';

	const socket = io(socketURL);
	let connected: boolean = false;

	socket.on('connect', () => {
		connected = true;
		const engine = socket.io.engine;
		console.debug(engine.transport.name);

		engine.once('upgrade', () => {
			console.debug('Upgrading connection: ', engine.transport.name);
		});

		engine.on('close', (reason) => {
			console.debug('socket-io-transport-closed', reason);
		});

		socket.emit('joiningRoom', room?.id);
	});

	socket.on('disconnected', () => {
		connected = false;
		console.debug('disconnected');
	});

	socket.on('connect_error', (err) => {
		console.debug(err.message);
	});

	socket.on('connect_timeout', (err) => {
		console.debug(err.message);
	});

	socket.on('error', (err) => {
		console.debug(err.message);
	});

	socket.on('messageBroadcast', (data) => {
		messages = [...messages, data];
	});

	function sendMessage(message: string) {
		const msg = {
			id: socket.id,
			message,
			room: room?.id
		};
		socket.emit('validateMessage', msg);
	}
</script>

<div class="col-6 chat-room">
	<div>
		<h3>
			{room?.name}
			<span class="fs-6 fw-light">
				{#if connected}
					Connected!
				{:else}
					Disconnected!
				{/if}
			</span>
		</h3>
	</div>
	<div class="chat-messages">
		<div class="chat-message">
			{#each messages as message}
				<p>
					<strong>{message.id}</strong>: {message.message}
				</p>
			{/each}
		</div>
	</div>
	<div class="chat-input">
		<input
			type="text"
			placeholder="Type your message here"
			bind:value={inputText}
			on:keydown={(event) => {
				if (event.key === 'Enter') {
					sendMessage(inputText);
					inputText = '';
				}
			}}
		/>
	</div>
</div>
