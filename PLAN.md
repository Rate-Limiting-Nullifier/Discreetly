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
  * by invite link?

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

### Stack?

#### Front End
* Nuxtjs

#### Back End
* Javascript / Typescript
  * Node?
  * Libp2p?
  * Shorter development cycle
  * Dev process is annoying
  * One language stack which is nice
* Rust
  * Libp2p?
  * Long development cycle
  * Fast / Solid
* Python
  * Library compatibility issues with RLNjs and maybe any other ZK libraries
  * I could write it really fast
  * I miss python

#### Database

* Libp2p?
* Waku?
* IPFS?
* Firebase?