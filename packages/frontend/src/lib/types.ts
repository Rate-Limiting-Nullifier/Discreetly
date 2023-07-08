import type {
	MembershipI,
	RoomGroupI,
	ServerI,
	RoomI,
	MessageI,
	SystemMessageI,
	IdentityCommitmentT,
	RLNContractI,
	Server
} from '../../../protocol-interfaces/src/main';

interface ButtonI {
	link: string;
	text: string;
	class?: string;
}

export type {
	RoomI,
	MessageI,
	MembershipI,
	RoomGroupI,
	ServerI,
	SystemMessageI,
	IdentityCommitmentT,
	RLNContractI,
	Server,
	ButtonI
};
