<template>
  Index Page
</template>

<style></style>
<script>
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");
socket.emit("test", "hello world test from client");
socket.on("test", (data) => {
  console.log(data);
});
socket.on("chat message", (data) => {
  console.log(data);
});
socket.emit("chat message", "hello world from client");
</script>