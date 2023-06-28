import { MessageI } from '../../interfaces/src/main';
import { RLNVerifier } from 'rlnjs';
import vkey from '../vkey';
import { poseidon1 } from 'poseidon-lite/poseidon1';

const v = new RLNVerifier(vkey);

async function verifyProof(msg: MessageI): Promise<boolean> {
  const rlnIdentifier = BigInt(msg.room);
  const msgHash = poseidon1([BigInt(msg.message)]);
  if (msgHash !== msg.proof.snarkProof.publicSignals.x) {
    return false;
  }
  return v.verifyProof(rlnIdentifier, msg.proof);
}

export default verifyProof;
