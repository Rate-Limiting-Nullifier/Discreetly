<template>
  <div class="d-flex flex-column align-content-between">
    <AppHeader />
    <main class="container-fluid align-items-center align-self-stretch">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
main {
  margin-top: 0.8rem;
}
</style>