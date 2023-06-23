import * as express from 'express';
import { Server } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

const socket_port = 3001;
const http_port = 3002;
const app = express();
const socket_server = new Server(app);

const io = new SocketIOServer(socket_server, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

io.on('connection', (socket: Socket) => {
  console.debug('a user connected');

  socket.on('chat message', (msg: string) => {
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

socket_server.listen(socket_port, () => {
  console.log(`Socket Server is running at http://localhost:${socket_port}`);
});

app.get('/endpoint', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.listen(http_port, () => {
  console.log(`Http Server is running at http://localhost:${http_port}`);
});
