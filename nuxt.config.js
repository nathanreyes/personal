const posts = require('./content/posts/posts.json');
const hljs = require('highlight.js');
const path = require('path');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:/]+/g) || [];
  }
}

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'Nathan Reyes',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My personal site.' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href: 'https://rsms.me/inter/inter-ui.css',
      },
    ],
  },
  modules: [
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-112800168-1',
      },
    ],
    '@nuxtjs/markdownit',
  ],
  markdownit: {
    html: true,
    linkify: true,
    breaks: true,
    highlight: function(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `
            <pre class="hljs"><code><span class="hljs-lang">${lang}</span>${
            hljs.highlight(lang, str, true).value
          }</code></pre>
          `;
        } catch (__) {}
      }

      return (
        '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
      );
    },
  },
  css: ['~/assets/styles/tailwind.css', '~/assets/styles/github.css'],
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#9f9c93' },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    postcss: [require('postcss-cssnext')(), require('tailwindcss')],
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
      // Disable purgecss until it can support the markdown files
      // if (!isDev) {
      //   config.plugins.push(
      //     new PurgecssPlugin({
      //       // purgecss configuration
      //       // https://github.com/FullHuman/purgecss
      //       paths: glob.sync([
      //         path.join(__dirname, './pages/**/*.vue'),
      //         path.join(__dirname, './layouts/**/*.vue'),
      //         path.join(__dirname, './components/**/*.vue'),
      //         path.join(__dirname, './content/posts/*.md'),
      //       ]),
      //       extractors: [
      //         {
      //           extractor: TailwindExtractor,
      //           extensions: ['vue', 'md'],
      //         },
      //       ],
      //       whitelist: ['html', 'body', 'nuxt-progress'],
      //     }),
      //   );
      // }
    },
  },
  generate: {
    routes: posts.map(p => `/blog/${p.slug}`),
  },
};
