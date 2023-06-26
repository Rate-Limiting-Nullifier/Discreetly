import * as express from 'express';
import { Server } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import * as cors from 'cors';
import verifier from './verifier';
import { serverConfig, rooms } from '../mockData/rooms';
import { MessageI } from '../../interfaces/src/main';
import vkey from '../../circuits/verification_key.json';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const http_port = 3001;
const socket_port = 3002;

const app = express();
const socket_server = new Server(app);
const v = new verifier(vkey);

const io = new SocketIOServer(socket_server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket: Socket) => {
  console.debug('a user connected');

  socket.on('chat message', (msg: MessageI) => {
    console.log('VALIDATING MESSAGE ' + msg);
    const valid = v.verifyProof(msg.room, msg.proof);

    io.emit('chat message', msg);
  });

  socket.on('test', (msg: string) => {
    console.log(msg);
    io.emit('test', { received: msg });
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
