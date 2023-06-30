import { RoomI, ServerI } from '../../protocol-interfaces/src/main';
export interface SettingsI {
  servers: ServerI[];
  selectedServer: number;
  selectedRoom: RoomI['id'];
}

export interface RoomsProviderI {
  room: RoomI['id'];
  rooms: RoomI[];
  switchRoom: (room: RoomI['id']) => void;
}
