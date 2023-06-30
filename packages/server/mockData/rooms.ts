import { MembershipI, RoomGroupI, ServerI } from '../../protocol-interfaces/src/main';
import { poseidon2 } from 'poseidon-lite/poseidon2';

import 'dotenv/config';

let serverID = 999n;

try {
  serverID = process.env.serverID ? (process.env.serverID as unknown as bigint) : 999n;
} catch (error) {
  console.error('Error reading serverID from .env file!');
}
console.log('SERVERID:', serverID);

const room_1 = poseidon2([serverID, 1n]);
const room_2 = poseidon2([serverID, 2n]);
const room_3 = poseidon2([serverID, 3n]);
const room_4 = poseidon2([serverID, 4n]);

const fake_user_1 = poseidon2([0n, 1n]);
const fake_user_2 = poseidon2([0n, 2n]);
const fake_user_3 = poseidon2([0n, 3n]);
const fake_user_4 = poseidon2([0n, 4n]);
const fake_user_5 = poseidon2([0n, 5n]);

export const rooms: RoomGroupI[] = [
  {
    name: 'Default',
    rooms: [
      {
        id: room_1,
        name: 'General',
        membership: [fake_user_1, fake_user_2, fake_user_5] as MembershipI
      }
    ]
  },
  {
    name: 'Games',
    rooms: [
      {
        id: room_3,
        name: 'Gunfire Reborn',
        membership: [fake_user_2, fake_user_3, fake_user_4] as MembershipI
      }
    ]
  },
  {
    name: 'Events',
    rooms: [
      {
        id: room_2,
        name: 'DevConnect 2023',
        membership: [fake_user_1, fake_user_3, fake_user_5] as MembershipI
      }
    ]
  }
];

export const serverConfig: ServerI = {
  name: 'Discreetly',
  serverInfoEndpoint: 'localhost:3001',
  messageHandlerSocket: 'localhost:3002',
  version: '0.0.1',
  roomGroups: rooms
};
