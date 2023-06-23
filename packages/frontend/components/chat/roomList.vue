<template>
  <ul class="list-group">
    <li v-for="(room, index) in rooms" :key="index" class="list-group-item" :class="{ active: currentRoom === room }"
      @click="switchRoom(room)">
      {{ room }}
    </li>
  </ul>
</template>
<script>

</script>
