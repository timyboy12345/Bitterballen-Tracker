// eslint-disable-next-line nuxt/no-cjs-in-config
const axios = require('axios')

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'BitterballenCultuur',
    titleTemplate: '%s - BitterballenCultuur',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/dateParser'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/postcss8',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'nuxt-leaflet',
    '@nuxtjs/sitemap',
    '@nuxtjs/sentry',
    '@nuxtjs/markdownit',
    'nuxt-lazy-load',
  ],

  axios: {
    baseURL: 'https://nprukzcs.directus.app',
  },

  sitemap: {
    hostname: 'https://bitterballencultuur.nl',
    gzip: true,
    exclude: [
      '/admin/**'
    ],
    routes: async() => {
      const routes = [];

      const { data: citiesData } = await axios.get('https://nprukzcs.directus.app/items/cities')
      citiesData.data.forEach((city) => {
        routes.push({
          url: `/cities/${city.slug}`,
          priority: 0.8,
          changefreq: 'weekly',
        })
      })

      const { data: restaurantsData } = await axios.get('https://nprukzcs.directus.app/items/restaurants')
      restaurantsData.data.forEach((city) => {
        routes.push({
          url: `/restaurants/${city.slug}`,
          priority: 0.8,
          changefreq: 'monthly',
        })
      })

      const { data: blogData } = await axios.get('https://nprukzcs.directus.app/items/blog_posts')
      blogData.data.forEach((blogPost) => {
        routes.push({
          url: `/blog/${blogPost.slug}`,
          priority: 0.7,
          changefreq: 'never',
          lastmod: blogPost.date_created
        })
      })

      return routes;
    }
  },

  sentry: {
    dsn: 'https://4af747629e0c49a88cd852fbf699dcf6@o324258.ingest.sentry.io/4504644356014080', // Enter your project's DSN.
    // Additional Module Options.
    config: {
      tracesSampleRate: 1.0,
      browserTracing: {},
      vueOptions: {
        trackComponents: true,
      },
    },
  },

  markdownit: {
    runtime: true // Support `$md()`
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  }
}
