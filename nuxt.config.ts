// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@maz-ui/nuxt',
    "@nuxt/image",
    "@pinia/nuxt",
  ],
  devServer: {
    port: 5005,
    host: "0.0.0.0",
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'es', // For Spanish
        class: 'light'
      }
    }
  },
  mazUi: {
    injectComponents: true,
    injectCss: true,
    injectAos: {
      injectCss: true,
    },
    injectUseToast: true,
    injectUseThemeHandler: false,
    devtools: true,
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
      { code: "es", iso: "es-ES", file: "es.ts", dir: "ltr", flag: '🇪🇸' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
    },
  },
   
})