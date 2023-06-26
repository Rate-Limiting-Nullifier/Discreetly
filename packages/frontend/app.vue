<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useRootStore } from '@/store/root'
const store = useRootStore()
store.fetchServers()
</script>

<script lang="ts">
(BigInt.prototype as any).toJSON = function () {
  return this.toString()
}
</script>
