import { RLNFullProof } from 'rlnjs';

export type IdentityCommitmentT = bigint;

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
  membership?: RLNContractI | IdentityCommitmentT[]; // List of Identity Commitments, or a contract address for an RLN contract
}

export interface ServerI {
  version?: string;
  rooms: RoomI[];
  wsPort?: number;
}
