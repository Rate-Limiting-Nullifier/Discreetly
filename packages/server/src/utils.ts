import { poseidon2 } from 'poseidon-lite/poseidon2';

export function genId(serverID: bigint, roomName: string | bigint | number) {
  return poseidon2([serverID, BigInt(roomName)]);
}
