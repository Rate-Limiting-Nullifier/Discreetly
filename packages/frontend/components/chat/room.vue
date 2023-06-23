<template>
  <div class="chat-messages">
    <div v-for="(message, index) in messages[currentRoom]" :key="index" class="chat-message">
      <p>
        <strong>{{ message.user }}</strong>: {{ message.text }}
      </p>
    </div>
  </div>
  <div class="chat-input">
    <input type="text" v-model="newMessage" @keyup.enter="addMessage" placeholder="Type your message here">
  </div>
</template>

<script setup>

</script>

<script>

</script>