<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts">
import { usePreferredDark } from '@vueuse/core'
import { useGlobalState, fetchServers } from './store'
const isDark = usePreferredDark();

(BigInt.prototype as any).toJSON = function () {
  return this.toString()
}

export default defineComponent({
  setup() {
    const state = useGlobalState()
    fetchServers()
    return { state }
  },
})

</script>
