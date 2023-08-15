// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({

  ssr: false,
  target: 'server',
  head: {
    title: "wakeapp",
    htmlAttrs: {
      lang: "ru",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "img/x-icon", href: "img/favicon.ico" }],
    __dangerouslyDisableSanitizers: ["script", "noscript"],
    script: [
      { src: 'https://telegram.org/js/telegram-web-app.js', body: true }
    ]
  },
  css: ["~/assets/less/app.less"],
  
  runtimeConfig: {
    public: {
      OPENWEATHERMAP_API_KEY: '2dc37cfef04dbd89b251a3a892381b35',
      BASE_API_URL: 'https://wakeapp-api.testers-site.ru/api'
    }
  },

  app: {
    pageTransition: { name: "page", mode: "out-in", type: 'transition',  },
    layoutTransition: { name: "page", mode: "out-in" },
  },

  components: [
    {
      global: true,
      path: "~/components",
    },
  ],

  buildModules: [
    "@vueuse/nuxt",
    "@nuxtjs/dotenv"
  ],
  modules: [
    "@pinia/nuxt",
  ],
 
  imports: {
    dirs: ["./store"],
  },
  server: {
    host: "0.0.0.0",
    port: "3000", // optional
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build

  build: {
    // babel: { compact: true },
    // extend(config) {
    //   config.performance.hints = false
    // }
  },
});
