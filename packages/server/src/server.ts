import * as express from 'express';
import { Server } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import * as cors from 'cors';
// import { createClient } from 'redis';
import initializeClaimCodeManager from './inviteCodes';
import { serverConfig, rooms } from '../config/rooms';
import { MessageI } from '../../protocol-interfaces/src/main';
import verifyProof from './verifier';

// Deal with bigints in JSON
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

// HTTP is to get info from the server about configuration, rooms, etc
const http_port = 3001;
// Socket is to communicate chat room messages back and forth
const socket_port = 3002;

const app = express();
const socket_server = new Server(app);

const io = new SocketIOServer(socket_server, {
  cors: {
    origin: '*'
  }
});

interface userCountI {
  [key: string]: number;
}

let userCount: userCountI = {};

// TODO get the claim code manager working with redis to store the state of the rooms and claim codes in a redis database that persists across server restarts
// Redis

// const redisClient = createClient();
// redisClient.on('error', (err) => console.log('Redis Client Error', err));
// await redisClient.connect();

//const ccm = await initializeClaimCodeManager();

io.on('connection', (socket: Socket) => {
  console.debug('a user connected');

  socket.on('validateMessage', (msg: MessageI) => {
    console.log('VALIDATING MESSAGE ' + msg);
    //const valid = verifyProof(msg);
    // if (!valid) {
    //   console.log('INVALID MESSAGE');
    //   return;
    // }
    msg.id = Date.now().toString();
    io.emit('messageBroadcast', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('joinRoom', (roomID: bigint) => {
    const id = roomID.toString();
    userCount[id] = userCount[id] ? userCount[id] + 1 : 1;
  });

  socket.on('leaveRoom', (roomID: bigint) => {
    const id = roomID.toString();
    userCount[id] = userCount[id] ? userCount[id] - 1 : 0;
  });
});

app.use(
  cors({
    origin: '*'
  })
);

app.get(['/', '/api'], (req, res) => {
  console.log('fetching server info');
  res.json(serverConfig);
});

app.get('/api/rooms', (req, res) => {
  console.log('fetching rooms');
  res.json(rooms);
});

app.post('/join', (req, res) => {
  req.on('data', (data) => {
    // TODO This is where we would validate the claim/invite code
    // TODO the `result` is in this format: https://github.com/AtHeartEngineering/Discreetly/blob/f2ea89d4b87004693985854e17a4e669177c4df3/packages/claimCodes/src/manager.ts#L10
    //const result = ccm.claimCode(data.claimCode);
    // TODO The `groupID` is the room ID like in https://github.com/AtHeartEngineering/Discreetly/blob/acc670fc4c43aa545dbbd03817879abfe5bc819e/packages/server/config/rooms.ts#L37
    // TODO If the claim code is valid, then we would add the user to the room
    // const identityCommitment = data.identityCommitment; // FIX this is the identity commitment from the user, think of it as a user ID
    res.status(200).send('OK');
  });
});

app.listen(http_port, () => {
  console.log(`Http Server is running at http://localhost:${http_port}`);
});

socket_server.listen(socket_port, () => {
  console.log(`Socket Server is running at http://localhost:${socket_port}`);
});

// // Disconnect from redis on exit
// process.on('SIGINT', () => {
//   console.log('disconnecting redis');
//   redisClient.disconnect().then(process.exit());
// });
