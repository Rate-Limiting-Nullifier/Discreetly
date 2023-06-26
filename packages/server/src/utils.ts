import { poseidon2 } from 'poseidon-lite/poseidon2';

export function genRoomId(roomName: string) {
  return poseidon2([this.serverID, BigInt(roomName)]);
}
