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
  id: RLNFullProof['rlnIdentifier']; // RLN Identifier
  name: string; // Readable name
  rateLimit?: number; // Messages per minute
  membership?: MembershipI; // List of Identity Commitments, or a contract address for an RLN contract
  type?: RoomType; // Public or private
}

export interface ServerI {
  version?: string;
  publicMembership?: MembershipI;
  rooms: RoomI[];
  wsPort?: number;
}
