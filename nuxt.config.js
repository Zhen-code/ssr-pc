import env from './env.js'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '粤剧院',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'http://lib.baomitu.com/normalize/6.0.0/normalize.min.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/css/main.css'
  ],
  ssr: false,
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/element-ui' },
    { src: '@/plugins/axios', mode: 'client' },
    { src: '@/plugins/global' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://192.168.0.124:8087',
    proxy: true
  },

  proxy: {
    '/api/': {
      target: 'http://192.168.0.124:8087',
      changeOrigin: true,
      pathRewrite: {
        '^/api/': ''
      }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    friendlyErrors: true
  },

  router: {
    middleware: 'filter',
    mode: 'hash',
    base: '/'
  },
  server: {
    port: '8002'
  },
  env: {
    MODE: env[process.env.NODE_ENV].MODE,
    BASE_URL: env[process.env.NODE_ENV].BASE_URL
  },
  target: 'static'
}
