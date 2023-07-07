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

export function randomBigInt(bits: number = 253) {
  let hexBits = bits / 4;
  let hexString = '';
  for (let i = 0; i < hexBits; i++) {
    hexString += Math.floor(Math.random() * 16).toString(16);
  }
  return BigInt('0x' + hexString);
}
