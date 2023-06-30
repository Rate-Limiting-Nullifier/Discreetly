"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var cors = require("cors");
// import { createClient } from 'redis';
// import initializeClaimCodeManager from './inviteCodes';
var rooms_1 = require("../mockData/rooms");
var verifier_1 = require("./verifier");
// Deal with bigints in JSON
BigInt.prototype.toJSON = function () {
    return this.toString();
};
// HTTP is to get info from the server about configuration, rooms, etc
var http_port = 3001;
// Socket is to communicate chat room messages back and forth
var socket_port = 3002;
var app = express();
var socket_server = new http_1.Server(app);
var io = new socket_io_1.Server(socket_server, {
    cors: {
        origin: '*'
    }
});
// Redis
// const redisClient = createClient();
// redisClient.on('error', (err) => console.log('Redis Client Error', err));
// await redisClient.connect();
// const ccm = await initializeClaimCodeManager(redisClient);
io.on('connection', function (socket) {
    console.debug('a user connected');
    socket.on('messageFromClient', function (msg) {
        console.log('VALIDATING MESSAGE ' + msg);
        var valid = (0, verifier_1.default)(msg);
        if (!valid) {
            console.log('INVALID MESSAGE');
            return;
        }
        io.emit('messageToClient', msg);
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
app.use(cors({
    origin: '*'
}));
app.get('/', function (req, res) {
    console.log('fetching server info');
    res.json(rooms_1.serverConfig);
});
app.get('/rooms', function (req, res) {
    console.log('fetching rooms');
    res.json(rooms_1.rooms);
});
// app.post('/join', (req, res) => {
//   req.on('data', (data) => {
//     if (ccm.claimCode(data.claimCode)) {
//       res.status(200).send('OK');
//     }
//   });
// });
app.listen(http_port, function () {
    console.log("Http Server is running at http://localhost:".concat(http_port));
});
socket_server.listen(socket_port, function () {
    console.log("Socket Server is running at http://localhost:".concat(socket_port));
});
// // Disconnect from redis on exit
// process.on('SIGINT', () => {
//   console.log('disconnecting redis');
//   redisClient.disconnect().then(process.exit());
// });
