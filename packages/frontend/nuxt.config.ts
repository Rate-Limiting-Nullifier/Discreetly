export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/device', '@pinia/nuxt', 'nuxt-security'],
  css: ['~/assets/scss/main.scss'],
  security: {
    corsHandler: { origin: '*', methods: '*' }
  }
});
