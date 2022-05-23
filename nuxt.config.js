export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Frontend Dev | Bobby Moynihan',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
    ]
  },
  ssr: process.env.NODE_ENV === 'production',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/tailwind.css',
    '~/assets/styles/style.scss',
  ],
  static: {
    prefix: false
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/gsap.js',
    '~/plugins/ScrollTrigger.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    'nuxt-vite',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          'Red+Hat+Mono': {
            wght: [300, 400, 600, 700],
            ital: [300, 500, 700],
          },
          'Khula': {
            wght: [800, 600, 300],
          }
        },
      },
    ],
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    // transpile: [
    //   'gsap'
    // ]
  },
  vite: {},
  pageTransition: {
    name: 'page',
    mode: 'out-in',
    beforeLeave(el) {
      el.style.opacity = '0'
      el.style.height = '0'
      el.style.overflow = 'hidden'
    },
    afterLeave(el) {
      el.style.filter = 'blur(0)';
    },
    beforeEnter(el) {
      el.style.filter = 'blur(20px)'
    },
    afterEnter(el) {
      el.style.filter = 'blur(0px)'
    }
  }
}
