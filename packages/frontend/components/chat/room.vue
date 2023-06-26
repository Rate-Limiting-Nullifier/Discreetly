
<template>
  <div class="chat-messages">
    <div class="chat-message" v-for="(message, index) in messages" :key="index">
      <p>
        <strong>{{ message.id }}</strong>: {{ message.message }}
      </p>
    </div>
  </div>
  <div class="chat-input">
    <input type="text" v-model="newMessage" @keyup.enter="sendMessage()" placeholder="Type your message here">
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from 'vue'
import { RoomI, MessageI } from '../../../interfaces/src/main'
import io from 'socket.io-client'
import { RLNFullProof } from 'rlnjs'

export default {
  props: {
    endpoint: {
      type: String,
      required: true
    },
    room: {
      type: Object as () => RoomI,
      required: true
    }
  },
  setup(props) {
    const messages = ref<MessageI[]>([])
    const newMessage = ref('')

    const socket = io(props.endpoint)

    onMounted(() => {
      socket.on('connect', () => {
        console.log('Connected to socketio message server')
      })
      // Receive Messages
      socket.on('messageToClient', (message: MessageI) => {
        messages.value.push(message)
      })
    })

    function sendMessage() {
      if (newMessage.value.trim() !== '') {
        const proof = {
          snarkProof: {},
          epoch: BigInt(Date.now()),
          rlnIdentifier: props.room.id as bigint
        } as RLNFullProof
        socket.emit('messageFromClient', {
          message: newMessage.value.trim(),
          room: props.room.id,
          proof: proof,
          id: proof.rlnIdentifier
        })
        newMessage.value = ''
      }
    }

    function messageID(message: MessageI) {
      return message.id.toString()
    }

    watch(messages, () => {
      const chatMessages = document.querySelector('.chat-messages')
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight
      }
    })

    return {
      messages,
      newMessage,
      sendMessage
    }
  }
}
</script>

<style scoped>
.chat-messages {
  height: 100%;
  overflow-y: scroll;
}
</style>