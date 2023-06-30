<template>
  <ul class="list-group">
    <li v-for="(iroom, index) in rooms" :key="index" class="list-group-item" @click="switchRoom(iroom.id as bigint)">
      {{ iroom.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { RoomGroupI } from '../../../protocol-interfaces/src/main'
defineProps<{
  rooms: RoomGroupI[]
  switchRoom: (roomId: bigint) => void
}>()
</script>
