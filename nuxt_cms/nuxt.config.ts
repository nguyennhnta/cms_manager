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
      apiUrl: process.env.VITE_API_URL || 'http://54.251.10.44:8081/api',
    },
  },
  ssr: false,
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: 
    [
       '~/components'
    ]
  ,

  modules: [[
  '@pinia/nuxt',
  {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore',
    ],
  },
], '@nuxtjs/tailwindcss', 'shadcn-nuxt'],

shadcn: {
  /**
   * Prefix for all the imported component
   */
  prefix: '',
  /**
   * Directory that the component lives in.
   * @default "./components/ui"
   */
  componentDir: './components/ui'
},
hooks: {
  'pages:extend' (pages) {
    function setMiddleware (pages: NuxtPage[]) {
      for (const page of pages) {
        if (/* some condition */ true) {
          page.meta ||= {}
          // Note that this will override any middleware set in `definePageMeta` in the page
          page.meta.middleware = ['auth']
          // page.meta.middleware = ['auth', 'permission']
        }
        if (page.children) {
          setMiddleware(page.children)
        }
      }
    }
    setMiddleware(pages)
  }
},
vite: {
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
      }
    }
  }
},
  pages: true,
  // router: {
  //   extendRoutes(routes, resolve) {
  //     routes.push({
  //       path: '/admin',
  //       component: resolve(__dirname, 'pages/admin.vue'),
  //       meta: { role: 'admin', middleware: 'role' }, // yêu cầu role "admin"
  //     });
  //     routes.push({
  //       path: '/settings',
  //       component: resolve(__dirname, 'pages/settings.vue'),
  //       meta: { permission: 'edit-settings', middleware: 'permission' }, // yêu cầu permission "edit-settings"
  //     });
  //   },
  // },
})
