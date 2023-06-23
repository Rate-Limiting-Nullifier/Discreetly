<template>
  <div id="app" class="container-fluid">
    <div class="grid" style="--bs-columns: 3;">
      <div class="g-col">
        <h3>Chat Rooms</h3>
        <ChatRoomList />
      </div>
      <div class="g-col-2 chat-room h-100">
        <ChatRoom></ChatRoom>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
</script >

<script>

</script>

<style scoped></style>
