// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-mdi"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  imports: {
    dirs: ["./types/**"],
  },
  routeRules: {
    "/": { redirect: "/posts" },
  },
  css: ["./assets/main.css"],
});
