import * as express from 'express';
import { Server } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import * as cors from 'cors';
import { serverConfig, rooms } from '../mockData/rooms';
import { MessageI } from '../../interfaces/src/main';
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

// RLN Verifier Wrapper

const io = new SocketIOServer(socket_server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket: Socket) => {
  console.debug('a user connected');

  socket.on('messageFromClient', (msg: MessageI) => {
    console.log('VALIDATING MESSAGE ' + msg);
    const valid = verifyProof(msg.room, msg.proof);
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

app.get('/', (req, res) => {
  console.log('fetching server info');
  res.json(serverConfig);
});

app.get('/rooms', (req, res) => {
  console.log('fetching rooms');
  res.json(rooms);
});

app.listen(http_port, () => {
  console.log(`Http Server is running at http://localhost:${http_port}`);
});

socket_server.listen(socket_port, () => {
  console.log(`Socket Server is running at http://localhost:${socket_port}`);
});
