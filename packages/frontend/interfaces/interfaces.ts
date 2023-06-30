import { RoomI } from '../../protocol-interfaces/src/main';

export interface SettingsI {
  selectedServer: number;
  servers: ServerI[];
}

export interface ServerI {
  name: string;
  serverInfoEndpoint: string;
  messageHandlerSocket: string;
  serverData: { rooms: RoomI[]; selectedRoom?: RoomI['id'] };
}

export interface RoomsProviderI {
  room: RoomI['id'];
  rooms: RoomI[];
  switchRoom: (room: RoomI['id']) => void;
}
