// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtPage } from 'nuxt/schema'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer: {
    port: 8081,
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.VITE_API_URL || 'http://localhost:8080/api',
    },
    passport: {
      baseUrl: process.env.PASSPORT_BASE_URL,
      clientId: process.env.PASSPORT_CLIENT_ID,
      clientSecret: process.env.PASSPORT_CLIENT_SECRET,
    }
  },
  ssr: false,

  modules: [
    // ...
    '@sidebase/nuxt-auth',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore',
        ],
      },
    ],
  ],

  // auth: {
  //   provider: {
  //     type: 'local',

  //     endpoints: {
  //       signIn: { path: '/login', method: 'post' },
  //       signOut: { path: '/logout', method: 'post' },
  //       signUp: { path: '/register', method: 'post' },
  //       getSession: {
  //         path: 'v1/me',
  //         method: 'get',
  //       },
  //     },

  //     pages: {
  //       login: '/login',
  //     },

  //     token: {
  //       // signInResponseTokenPointer: "/access_token",
  //       type: "Bearer",
  //       headerName: "Authorization",
  //       maxAgeInSeconds: 60 * 60 * 24,
  //       sameSiteAttribute: "lax",
  //     },
  //     // sessionDataType: { id: "number", email: "string", password: "string" },
  //   },
  //   baseURL: process.env.PASSPORT_BASE_URL,

  //   /*     session: {
  //   Whether to refresh the session every time the browser window is refocused.
  //   enableRefreshOnWindowFocus: true,
  //   Whether to refresh the session every `X` milliseconds. Set this to `false` to turn it off. The session will only be refreshed if a session already exists.
  //     enableRefreshPeriodically: 5000,
  //   }, */

  //   globalAppMiddleware: {
  //     isEnabled: true,
  //   },
  // },

  // hooks: {
  //   'pages:extend' (pages) {
  //     function setMiddleware (pages: NuxtPage[]) {
  //       for (const page of pages) {
  //         if (/* some condition */ true) {
  //           page.meta ||= {}
  //           // Note that this will override any middleware set in `definePageMeta` in the page
  //           page.meta.middleware = ['auth']
  //         }
  //         if (page.children) {
  //           setMiddleware(page.children)
  //         }
  //       }
  //     }
  //     setMiddleware(pages)
  //   }
  // },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["legacy-js-api"],
        }
      }
    }
  }
})
