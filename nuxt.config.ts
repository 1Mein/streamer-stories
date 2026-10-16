export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      link: [{ rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
      meta: [{ name: 'theme-color', content: '#10100f' }]
    }
  },
  runtimeConfig: {
    public: { siteUrl: 'http://localhost:3000' }
  },
  typescript: { strict: true },
  compatibilityDate: '2024-09-01'
})
