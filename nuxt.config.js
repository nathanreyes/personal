const posts = require('./content/posts/posts.json');

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Nathan Reyes',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My personal site.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Raleway|Open+Sans:300,400' }
    ],
  },
  modules: [
    '@nuxtjs/markdownit'
  ],
  css: [
    '@/assets/minireset.sass',
    '@/assets/site.sass'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#9f9c93' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    routes: posts.map(p => `/${p.slug}`),
  },
};
