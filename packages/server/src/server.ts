import * as express from 'express';
import { Server } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import * as cors from 'cors';
// import { createClient } from 'redis';
// import initializeClaimCodeManager from './inviteCodes';
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

// Redis

// const redisClient = createClient();
// redisClient.on('error', (err) => console.log('Redis Client Error', err));
// await redisClient.connect();

// const ccm = await initializeClaimCodeManager(redisClient);

io.on('connection', (socket: Socket) => {
  console.debug('a user connected');

  socket.on('messageFromClient', (msg: MessageI) => {
    console.log('VALIDATING MESSAGE ' + msg);
    const valid = verifyProof(msg);
    if (!valid) {
      console.log('INVALID MESSAGE');
      return;
    }
    io.emit('messageToClient', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
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

// app.post('/join', (req, res) => {
//   req.on('data', (data) => {
//     if (ccm.claimCode(data.claimCode)) {
//       res.status(200).send('OK');
//     }
//   });
// });

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
