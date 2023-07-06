import type { RLNFullProof } from 'rlnjs';

export type IdentityCommitmentT = bigint;

export enum RoomType {
  PUBLIC = 'public',
  GATED = 'gated',
  PRIVATE = 'private',
  SECURE = 'secure'
}

export interface MembershipI {
  identityCommitments?: IdentityCommitmentT[];
  rlnContract?: RLNContractI;
}

export interface RLNContractI {
  address: string;
  chainId: number;
}

export interface MessageI {
  id?: string; // internal nullifier as string
  room?: RLNFullProof['rlnIdentifier'];
  message: string;
  proof?: RLNFullProof;
}

export interface SystemMessageI {
  timestamp: string; // unix epoch time in ms as string
  message: string; // plain text message
  room?: RLNFullProof['rlnIdentifier']; // optionally send it to one room or all rooms
}

export interface RoomI {
  id: RLNFullProof['rlnIdentifier'] | string; // RLN Identifier
  name: string; // Readable name
  rateLimit?: number; // Milliseconds between messages
  membership?: MembershipI; // List of Identity Commitments, or a contract address for an RLN contract
  type?: RoomType; // Public or private
  messageHandlerSocket?: string; // Port for websocket connections
}

export interface RoomGroupI {
  name: string;
  rooms: RoomI[];
}

export interface ServerI {
  name: string;
  version?: string;
  serverInfoEndpoint: string;
  messageHandlerSocket?: string; // Default port for websocket connections
  publicMembership?: MembershipI;
  roomGroups: RoomGroupI[];
  selectedRoom?: RoomI['id'];
}

export class Server {
  name: string;
  version: string | undefined;
  serverInfoEndpoint: string;
  messageHandlerSocket: string | undefined;
  publicMembership: MembershipI | undefined;
  roomGroups: RoomGroupI[];
  selectedRoom: string | bigint;
  constructor(public server: ServerI) {
    this.name = server.name;
    this.version = server.version;
    this.serverInfoEndpoint = server.serverInfoEndpoint;
    this.messageHandlerSocket = server.messageHandlerSocket;
    this.publicMembership = server.publicMembership;
    this.roomGroups = server.roomGroups;
    this.selectedRoom = server.selectedRoom
      ? server.selectedRoom
      : server.roomGroups[0].rooms[0].id;
  }

  getRoomById(id: string | bigint): RoomI | undefined {
    return this.roomGroups
      .map((group) => group.rooms)
      .flat()
      .find((room) => room.id === id);
  }

  getRoomByName(name: string): RoomI | undefined {
    return this.roomGroups
      .map((group) => group.rooms)
      .flat()
      .find((room) => room.name === name);
  }

  getRoomGroupByName(name: string): RoomGroupI | undefined {
    return this.roomGroups.find((group) => group.name === name);
  }

  setRoomById(id: string | bigint) {
    if (this.getRoomById(id)) {
      this.selectedRoom = id;
      return id;
    } else {
      return -1;
    }
  }

  getRoomHandlerSocket(id: string | bigint): string | undefined {
    const room = this.getRoomById(id);
    if (room) {
      return room.messageHandlerSocket;
    } else {
      return this.messageHandlerSocket;
    }
  }
}
