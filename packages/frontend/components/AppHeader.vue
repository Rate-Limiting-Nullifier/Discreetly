<template>
  <header>
    <nav class="navbar fixed-top navbar-dark bg-dark navbar-expand-lg">
      <div class="container-fluid d-flex align-content-between">
        <div class="d-flex">
          <a class="navbar-brand" href="#">Discreetly</a>

          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <NuxtLink to="/" class="nav-link">Home</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink to="/chat" class="nav-link">Chat</NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink to="/login" class="nav-link">Login</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="navbar-brand" id="server-title">{{ serverName }}</div>
        <div>
          <div class="navbar-text">© 2023 Privacy and Scaling Explorations</div>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>
<style scoped lang="scss">
#server-title {
  font-family: 'Space Mono';
  color: var(--steel-light);
}
</style>

<script setup lang="ts">
import { useRootStore } from '@/store/root'
import { ref } from 'vue'
const store = useRootStore()
const selectedServer = store.settings.selectedServer
const serverName = ref(selectedServer.name)
</script>