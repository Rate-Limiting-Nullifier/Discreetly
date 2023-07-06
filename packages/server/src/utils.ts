import { poseidon2 } from 'poseidon-lite/poseidon2';

export function genId(serverID: bigint, roomName: string | bigint | number) {
  if (typeof roomName === 'string') {
    let roomNum = '';
    for (let i = 0; i < roomName.length; i++) {
      roomNum += roomName.charCodeAt(i).toString();
    }
    return poseidon2([serverID, BigInt(roomNum)]);
  }
  return poseidon2([serverID, BigInt(roomName)]);
}
