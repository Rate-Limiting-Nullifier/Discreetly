import { RLNVerifier, RLNFullProof, VerificationKey } from 'rlnjs';

class verifier {
  vkey: VerificationKey;
  constructor(vkey: VerificationKey) {
    this.vkey = vkey;
  }

  async verifyProof(roomId: bigint, proof: RLNFullProof): Promise<boolean> {
    const v = new RLNVerifier(this.vkey, roomId);
    return v.verifyProof(proof);
  }
}

export default verifier;
