/*
This is experimenting with the idea of transitioning different versions of a room based on filtering "bad actors" using non-inclusion proofs.

Essentially, if certain messages are flagged by the community as "bad actors", then all users that want to transition to the next room must provide a non-inclusion proof that they did not produce the bad message.

This really is going to only be used for extreme circumstances.
*/

interface User {
  u: number;
  name: string;
  bad?: boolean | number;
  transition?: boolean;
}

let users = [
  { u: 1, bad: false, transition: false, name: 'Alice' },
  { u: 2, bad: false, transition: false, name: 'Bob' },
  { u: 3, bad: false, transition: false, name: 'Carol' },
  { u: 4, bad: false, transition: false, name: 'Dave' },
  { u: 5, bad: false, transition: false, name: 'Eve' },
  { u: 6, bad: false, transition: false, name: 'Frank' },
  { u: 7, bad: false, transition: false, name: 'Grace' },
  { u: 8, bad: false, transition: false, name: 'Heidi' },
  { u: 9, bad: false, transition: false, name: 'Ivan' },
  { u: 10, bad: false, transition: false, name: 'Judy' },
  { u: 11, bad: false, transition: false, name: 'Mallory' },
  { u: 12, bad: false, transition: false, name: 'Oscar' },
  { u: 13, bad: false, transition: false, name: 'Peggy' },
  { u: 14, bad: false, transition: false, name: 'Sybil' },
  { u: 15, bad: false, transition: false, name: 'Trent' },
  { u: 16, bad: false, transition: false, name: 'Walter' },
  { u: 17, bad: false, transition: false, name: 'Wendy' }
];

class members {
  room0: User[];
  room1: User[];
  room2: User[];
  room3: User[];
  rooms: User[][];
  epoch: number;
  constructor(members: User[]) {
    this.epoch = 0;
    this.room0 = members;
    this.room1 = [];
    this.room2 = [];
    this.room3 = [];
    this.rooms = [this.room0, this.room1, this.room2, this.room3];
    this.stats('Initial');
  }

  public runEpoch() {
    this.epoch++;
    this.evaluateEpoch();
    this.stats('Starting');
    this.transitionEpoch();
    this.stats('Ending');
  }

  stats(Title: string = '') {
    console.log(Title, 'Epoch: ', this.epoch);
    this.rooms.forEach((room, index) => {
      console.log(
        'Room:',
        index,
        'Members:',
        room.length,
        'baddies:',
        room.reduce((acc, user) => acc + (user.bad ? 1 : 0), 0),
        'Want to Transition:',
        room.reduce((acc, user) => acc + (user.transition ? 1 : 0), 0)
      );
    });
  }

  evaluateEpoch(badPercentage: number = 0.05, transitionPercentage: number = 0.6) {
    this.rooms.forEach((room, index) => {
      //console.log("Evaluating Room: ", index)
      if (room.length > 0) {
        // Make random users bad
        for (let i = 0; i < badPercentage * room.length; i++) {
          const index = Math.floor(Math.random() * room.length);
          room[index].bad = this.epoch;
          //console.log("Marking user as bad: ", room[index].name)
        }
        // Make random users transition
        let transitioning = 0;
        let maxrounds = room.length * 2;
        while (transitioning < transitionPercentage * room.length && maxrounds-- > 0) {
          const index = Math.floor(Math.random() * room.length);
          if (!room[index].transition) {
            console.log('Marking user as transitioning: ', index);
            room[index].transition = true;
            transitioning++;
          }
        }
      }
    });
  }

  transitionEpoch() {
    this.rooms.forEach((room, index) => {
      if (room.length > 0 && index < this.rooms.length - 1) {
        // Make random users bad
        room.forEach((user) => {
          if (user.transition && !user.bad) {
            user.bad = false;
            user.transition = false;
            this.rooms[index + 1].push(user);
            room.splice(room.indexOf(user), 1);
          } else {
            user.transition = false;
            user.bad = false;
          }
        });
      }
    });
  }
}

let m = new members(users);
m.runEpoch();
m.runEpoch();
m.runEpoch();
m.runEpoch();
m.runEpoch();
m.runEpoch();
m.runEpoch();
m.runEpoch();
m.runEpoch();
m.runEpoch();
console.log(m.rooms);
