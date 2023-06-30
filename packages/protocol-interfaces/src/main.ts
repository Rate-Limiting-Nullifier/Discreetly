import { RLNFullProof } from 'rlnjs';

export type IdentityCommitmentT = bigint;

export enum RoomType {
  PUBLIC = 'public',
  GATED = 'gated',
  PRIVATE = 'private',
  SECURE = 'secure'
}

export interface MembershipI {
  identityCommitment?: IdentityCommitmentT[];
  rlnContract?: RLNContractI;
}

export interface RLNContractI {
  address: string;
  chainId: number;
}

export interface MessageI {
  id: string; // internal nullifier as string
  room: RLNFullProof['rlnIdentifier'];
  message: string;
  proof: RLNFullProof;
}

export interface SystemMessageI {
  timestamp: string; // unix epoch time in ms as string
  message: string; // plain text message
  room?: RLNFullProof['rlnIdentifier']; // optionally send it to one room or all rooms
}

export interface RoomI {
  id: RLNFullProof['rlnIdentifier'] | string; // RLN Identifier
  name: string; // Readable name
  rateLimit?: number; // Messages per minute
  membership?: MembershipI; // List of Identity Commitments, or a contract address for an RLN contract
  type?: RoomType; // Public or private
  messageHandlerSocket?: number; // Port for websocket connections
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
}
