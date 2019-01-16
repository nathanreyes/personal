<template>
  <div class="max-w-md mx-auto">
    <!-- <post-list-item v-for="post in posts" :key="post.title" v-bind="post" class="mb-8"></post-list-item> -->
    <div v-for="{ slug, title, date } in posts" :key="title" class="mb-6 md:mb-8">
      <nuxt-link
        class="block link text-center md:text-left no-underline mb-2"
        :to="`/blog/${slug}`"
      >{{ title }}</nuxt-link>
      <p
        class="text-center text-sm text-grey-l2 font-medium tracking-wide md:text-left mb-3"
      >{{ date.toDateString() }}</p>
    </div>
  </div>
</template>

<script>
import Post from '~/util/post';

export default {
  layout: 'default',
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
