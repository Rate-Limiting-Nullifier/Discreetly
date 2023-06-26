import { RoomI, ServerI } from '../../interfaces/src/main';
import { poseidon2 } from 'poseidon-lite/poseidon2';

import 'dotenv/config';
let serverID = 999n;

console.log(process.env.serverID);

try {
  serverID = process.env.serverID ? (process.env.serverID as unknown as bigint) : 999n;
} catch (error) {
  console.error('Error reading serverID from .env file!');
}
const room_1 = poseidon2([serverID, 1n]);
const room_2 = poseidon2([serverID, 2n]);
const room_3 = poseidon2([serverID, 3n]);
const room_4 = poseidon2([serverID, 4n]);

const fake_user_1 = poseidon2([0n, 1n]);
const fake_user_2 = poseidon2([0n, 2n]);
const fake_user_3 = poseidon2([0n, 3n]);
const fake_user_4 = poseidon2([0n, 4n]);
const fake_user_5 = poseidon2([0n, 5n]);

export const rooms: RoomI[] = [
  {
    id: room_1,
    name: 'General',
    membership: [fake_user_1, fake_user_2]
  },
  {
    id: room_2,
    name: 'Event 1',
    membership: [fake_user_1, fake_user_3, fake_user_5]
  },
  {
    id: room_3,
    name: 'Club 1',
    membership: [fake_user_2, fake_user_3, fake_user_4]
  },
  {
    id: room_4,
    name: 'Test 1',
    membership: [fake_user_4, fake_user_5]
  }
];

export const serverConfig: ServerI = {
  version: '0.0.1',
  rooms: rooms,
  wsPort: 3001
};
