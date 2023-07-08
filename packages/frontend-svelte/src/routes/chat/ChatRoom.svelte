<script lang="ts">
	import { identityStore, selectedServer, messageStore, serverDataStore } from '$lib/stores';
	import type { RoomI, MessageI } from '$lib/types';
	import { io } from 'socket.io-client';
	import { onDestroy } from 'svelte';
	import { genProof } from '$lib/utils';
	import { Identity } from '@semaphore-protocol/identity';

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

		engine.once('upgrade', () => {
			console.debug('Upgraded connection to', engine.transport.name);
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
		console.debug('chat connection error', err.message);
	});

	socket.on('connect_timeout', (err) => {
		console.debug('chat connection timeout', err.message);
	});

	socket.on('error', (err) => {
		console.debug('chat websocket error', err.message);
	});

	socket.on('messageBroadcast', (data: MessageI) => {
		messages = [data, ...messages];
		messages = messages.slice(0, 500);
		$messageStore[room.id.toString()] = messages;
	});

	function sendMessage(message: string) {
		const identity = new Identity($identityStore.toString());
		genProof(room, message, identity).then((msg) => {
			console.log(msg);
			socket.emit('validateMessage', msg);
		});
	}
</script>

<div class="col chat-room">
	<h3 class="d-flex justify-content-between align-content-center">
		{room?.name}
		<span class="fs-6 fw-light align-self-center" style="color:gray">
			{#if connected}
				<div aria-label="Connected">🟢</div>
			{:else}
				<div aria-label="Disconnected">🔴</div>
			{/if}
		</span>
	</h3>
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
