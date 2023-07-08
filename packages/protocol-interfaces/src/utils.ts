import { poseidon2 } from 'poseidon-lite/poseidon2';

export function str2BigInt(str: string) {
  let num = '';
  for (let i = 0; i < str.length; i++) {
    num += str.charCodeAt(i).toString();
  }
  return BigInt(num);
}

export function genId(serverID: bigint, roomName: string | bigint | number) {
  if (typeof roomName === 'string') {
    return poseidon2([serverID, str2BigInt(roomName)]);
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
