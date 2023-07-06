import { poseidon2 } from 'poseidon-lite/poseidon2';

export function genId(serverID: bigint, roomName: string | bigint | number) {
  if (typeof roomName === 'string') {
    return poseidon2([serverID, BigInt(Buffer.from(roomName).toString('hex', 16))]);
  }
  return poseidon2([serverID, BigInt(roomName)]);
}
