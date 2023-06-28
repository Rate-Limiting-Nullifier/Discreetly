# ZK-Chat v2

## Topic

* Should we rewrite ZK-chat?
    * current ZK Chat is not maintainable
    * We could use zkitterd-zkchat
    * We could write it from scratch

## Requirements

### Login

* Cryptkeeper
* Sismo?
* Zupass?
* Walletconnect/metamask?

### Groups

* Admin (me) can make groups
  * by invite code
    * Permission to add 1 identity commitment
* Gated Rooms (that you can watch, but can't participate in)
  * ZK Stamps!
  *

* Types of Rooms:
| Type    | Read          | Write                           | Encrypted           | Centralized | RLN Protected |
| ------- | ------------- | ------------------------------- | ------------------- | ----------- | ------------- |
| Public  | Y             | via link/code for all rooms     | N                   | Y           | Y             |
| Gated   | Y             | via link/code for specific room | N                   | Y           | Y             |
| Private | via link/code | via link/code for specific room | N                   | Y           | Y             |
| Secure  | via link/code | via link/code for specific room | Y (shared password) | Y           | Y             |
| DM-P2P  | via link/code | via link/code for specific room | Y (shared password) | N (p2p)     | ?             |

### Chat

* Public group chat
* Private group chat
  * by invite link
  * if idcommitment is in group
* DMs (private group chat, but encrypted)

## Open Questions
* P2P v Centralized?
* Rate Limits?
* Group Membership on contract?
  * Staking by tiers with different rate limits?
* Should messages be ephemeral/temporary? (the last day?)

### Front End
discreetly.chat will be the front end and backend
#### Stack
* Nuxtjs
* websockets

#### Login
* Cryptkeeper
* Metamask
* Walletconnect
* Sismo
* Zupass

### Back End
discreetly.chat will be the front end and backend

stakers.chat will be a standalone backend for eth stakers
#### Stack
* Javascript / Typescript
  * Node?
  * Libp2p?
  * Shorter development cycle
  * Dev process is annoying
  * One language stack which is nice
* Python
  * Library compatibility issues with RLNjs and maybe any other ZK libraries
  * I could write it really fast
  * I miss python

#### Database

* Libp2p?
* Waku?
* IPFS?
* Firebase?