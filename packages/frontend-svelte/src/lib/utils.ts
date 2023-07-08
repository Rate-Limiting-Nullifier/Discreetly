import { RLNProver, type RLNFullProof, type MerkleProof } from 'rlnjs';
import { randomBigInt, genId } from '../../../protocol-interfaces/src/utils';
import { poseidon1 as poseidon } from 'poseidon-lite/poseidon1';
import { Group } from '@semaphore-protocol/group';
import type { Identity } from '@semaphore-protocol/identity';
import type { MessageI, RoomI } from './types';

const prover: RLNProver = new RLNProver('/rln.wasm', '/rln_final.zkey');

interface proofInputsI {
	rlnIdentifier: bigint;
	identitySecret: bigint;
	userMessageLimit: bigint;
	messageId: bigint;
	merkleProof: MerkleProof;
	x: bigint;
	epoch: bigint;
}

async function genProof(room: RoomI, message: string, identity: Identity): Promise<MessageI> {
	const messageHash: bigint = poseidon([message]);
	const group = new Group(room.id, 20, room.membership?.identityCommitments);
	const merkleproof: MerkleProof = await group.getMerkleProof(identity.getCommitment());
	const proofInputs: proofInputsI = {
		rlnIdentifier: BigInt(room.id),
		identitySecret: identity.getSecret(),
		userMessageLimit: 1n,
		messageId: 1n,
		merkleProof: merkleproof,
		x: messageHash,
		epoch: BigInt(Date.now().toString())
	};

	const proof: RLNFullProof = await prover.generateProof(proofInputs);
	const msg: MessageI = {
		id: proof.snarkProof.publicSignals.nullifier.toString(),
		message: message,
		room: BigInt(proof.snarkProof.publicSignals.externalNullifier),
		proof
	};
	return msg;
}

export { genProof, randomBigInt, genId };
