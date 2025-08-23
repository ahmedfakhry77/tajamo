// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@maz-ui/nuxt",
    "@nuxt/image",
    "@pinia/nuxt",
    "nuxt-snackbar",
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://api.tajamo.org'
    }
  },
  devServer: {
    port: 5005,
    host: "0.0.0.0",
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "es", // For Spanish
        class: "light",
      },
    },
  },
  snackbar: {
    top: true,
    right: true,
    duration: 5000,
  },
  mazUi: {
    injectComponents: true,
    injectCss: true,
    injectAos: {
      injectCss: true,
    },
    injectUseToast: true,
    injectUseThemeHandler: true,
    devtools: true,
    mode: "light",
  },

  i18n: {
    compilation: {
      strictMessage: false,
    },
    vueI18n: "./i18n.config.ts",
    strategy: "no_prefix",
    rootRedirect: "",
    lazy: false,
    langDir: "locales",
    defaultLocale: "es",
    locales: [
      { code: "es", iso: "es-ES", file: "es.ts", dir: "ltr", flag: "🇪🇸" },
    ],
    detectBrowserLanguage: {
      useCookie: true,
    },
  },
});
