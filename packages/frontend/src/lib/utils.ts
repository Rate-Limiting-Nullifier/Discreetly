import { RLNProver, type RLNFullProof, type MerkleProof } from 'rlnjs';
import { randomBigInt, genId, str2BigInt } from '../../../protocol-interfaces/src/utils';
import { poseidon1 } from 'poseidon-lite/poseidon1';
import { Group } from '@semaphore-protocol/group';
import type { Identity } from '@semaphore-protocol/identity';
import type { MessageI, RoomI } from './types';
import { poseidon2 } from 'poseidon-lite/poseidon2';

const wasmPath = '/rln/circuit.wasm';
const zkeyPath = '/rln/final.zkey';
const prover: RLNProver = new RLNProver(wasmPath, zkeyPath);

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
	const userMessageLimit = BigInt(1);
	const messageHash: bigint = poseidon1([str2BigInt(message)]);
	const group = new Group(room.id, 20, room.membership?.identityCommitments);
	const rateCommitment: bigint = poseidon2([identity.getCommitment(), userMessageLimit]);
	group.addMember(rateCommitment); // FIXME: This is just a hack to add the user to the group for testing
	const proofInputs: proofInputsI = {
		rlnIdentifier: BigInt(room.id),
		identitySecret: identity.getSecret(),
		userMessageLimit: userMessageLimit,
		messageId: BigInt(0),
		merkleProof: group.generateMerkleProof(group.indexOf(rateCommitment)),
		x: messageHash,
		epoch: BigInt(Date.now().toString())
	};
	//console.debug('PROOFINPUTS:', proofInputs);
	return prover.generateProof(proofInputs).then((proof: RLNFullProof) => {
		console.log('Proof generated!');
		const msg: MessageI = {
			id: proof.snarkProof.publicSignals.nullifier.toString(),
			message: message,
			room: BigInt(proof.snarkProof.publicSignals.externalNullifier),
			proof
		};
		return msg;
	});
}

export { genProof, randomBigInt, genId };
