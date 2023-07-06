<template>
  {{ state.settings }}
</template>

<style></style>
<script lang="ts">
import { useGlobalState } from '../store'

export default defineComponent({
  async setup() {
    const state = useGlobalState()
    return { state }
  },
})
</script>