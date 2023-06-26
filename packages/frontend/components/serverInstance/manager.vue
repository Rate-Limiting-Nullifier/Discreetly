<template>
  <div class="grid" style="--bs-columns: 5;">
    <div class="g-col">
      <h3>Chat Rooms</h3>
      <ChatRoomList :rooms=rooms :switchRoom=switchRoom />
    </div>
    <div class="g-col-4 chat-room h-100">
      <ChatRoom :endpoint=roomSocketEndpoint :room=room></ChatRoom>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRootStore } from '@/store/root'
import { ref } from 'vue'
import { RoomI } from '../../../interfaces/src/main'

const rootStore = useRootStore()

const rooms = ref(rootStore.getSelectedServer.serverData.rooms)
const room = ref(rootStore.getSelectedRoom ? rootStore.getSelectedRoom : rooms.value[0])
const roomSocketEndpoint = ref(rootStore.getSelectedServer.messageHandlerSocket)

function switchRoom(new_room: RoomI["id"]) {
  console.log("switching room to " + new_room)
  rootStore.setSelectedRoom(new_room)
  room.value = rootStore.getSelectedRoom
}
</script>

<script lang="ts">
export default {
  data() {
    return {
      rooms: [] as RoomI[],
    }
  }
}
</script>
