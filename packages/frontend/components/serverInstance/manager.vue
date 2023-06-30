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
import { getSelectedRoom, getSelectedServer, setSelectedRoom } from '../../store'
import { ref } from 'vue'
import { RoomI, RoomGroupI, ServerI } from '../../../protocol-interfaces/src/main'

const server: Ref<ServerI> = ref(getSelectedServer())
const room: Ref<RoomI> = ref(getSelectedRoom())
const roomGroups: Ref<RoomGroupI[]> = ref(server.value.roomGroups)
const roomSocketEndpoint = ref(server.value.messageHandlerSocket)

function switchRoom(new_room: RoomI["id"]) {
  console.log("switching room to " + new_room)
  setSelectedRoom(new_room)
  room.value = getSelectedRoom()
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
