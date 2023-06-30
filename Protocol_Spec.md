## Overview

Discreetly is an open protocol anonymous chat system.

The example scenario I am going to use throughout this document is a chat room for Steam games, where the barrier to entry for a room is a certain threshold of achievments accomplished in the game (20% by default?)

## Rooms

A room can be created by the server owner/admin, with certain criteria/barrier to entry.

### Karma Culling

In an anonmyous chat, it is (basically) impossible to know who said something the large majority didn't agree with, but you can prove that you *didn't* say something. So we can use this to exclude very bad actors using  a karma system where users can upvote or downvote messages, which under the hood are non-inclusion proofs, essentially saying "i didn't create this post, and I did or didn't like this".

> This non-inclusion proof includes a new "transiition identity commitment".

After a certain amount of time (configurable by the server, maybe 1 day to start and over time move to 30 days?), the group can choose to transition, where the server would generate a new version of the room, and everyone would have to make a new semaphore proof with either their old identity commitment or a new one, and everyone who wants to participate in the room would have to make a non-inclusion proof for any of the messages that broke some UPVOTE/DOWNVOTE threshold (configurable by the server, something like 2x more downvotes than upvotes, and [over 20 votes total] | [10% of the room] | [the lowest voted post]).