<script lang="ts">
	import { identityStore, selectedServer, messageStore, serverDataStore } from '$lib/stores';
	import type { RoomI, MessageI } from '$lib/types';
	import { io } from 'socket.io-client';
	import { onDestroy } from 'svelte';
	import { prover } from '$lib/utils';

	export let room: RoomI;

	if (!$messageStore[room.id.toString()]) {
		$messageStore[room.id.toString()] = [];
	}
	let messages = [...$messageStore[room.id.toString()]];

	onDestroy(() => {
		socket.emit('leavingRoom', room?.id);
		socket.disconnect();
	});

	let inputText = '';
	let sendButtonText = 'Send';

	const socketURL: string = $serverDataStore[$selectedServer].messageHandlerSocket || '';

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
		messages = [data, ...messages];
		messages = messages.slice(0, 500);
		$messageStore[room.id.toString()] = messages;
	});

	function sendMessage(message: string) {
		const msg = prover(room, message, $identityStore);
		socket.emit('validateMessage', msg);
	}
</script>

<div class="col chat-room">
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
	<div id="chat-messages" class="mb-3">
		<section>
			{#each messages as message}
				<div class="chat-message">
					<strong>{message.id}</strong>: {message.message}
				</div>
			{/each}
		</section>
	</div>
	<div id="chat-input">
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
		<div
			class="btn btn-primary"
			on:click={() => {
				sendMessage(inputText);
				inputText = '';
			}}
		>
			{sendButtonText}
		</div>
	</div>
</div>

<style>
	#chat-messages {
		border: 1px solid var(--steel-dark);
		border-radius: 0.5em;
		padding: 0.35rem 0.5rem;
		background-color: var(--steel-white);
	}

	#chat-messages section {
		overflow-y: scroll;
		max-height: 60vh;
		display: flex;
		flex-direction: column-reverse;
		gap: 0.5rem;
	}
	#chat-input {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
	}

	#chat-input input {
		flex-grow: 1;
	}
</style>
