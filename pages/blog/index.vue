<template>
  <div class="max-w-lg mx-auto">
    <nuxt-link
      :to="`/blog/${slug}`"
      v-for="{ slug, title, date } in posts"
      :key="title"
      class="block mt-6 mb-6 md:mb-8 bg-gray-200 hover:bg-gray-300 py-4 px-6 rounded-lg cursor-pointer"
    >
      <h3 class="text-blue-600 text-base text-center font-medium md:text-left mb-2">{{ title }}</h3>
      <div class="w-16 border border-b-2 border-gray-400 my-2"/>
      <div class="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          class="w-4 h-4 fill-current text-gray-600"
        >
          <path
            d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
          ></path>
        </svg>
        <span
          class="text-center text-sm text-gray-600 font-medium tracking-wide md:text-left ml-2"
        >{{ date.toDateString() }}</span>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import Post from '~/util/post';

export default {
  layout: 'blog',
  fetch({ store }) {
    store.dispatch('posts/getAll');
  },
  computed: {
    posts() {
      return this.$store.state.posts.list.map(p => Post(p));
    },
  },
};
</script>
