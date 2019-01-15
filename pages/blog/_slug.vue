<template>
  <div class="max-w-md mx-auto">
    <h2 class="header">{{ post.title }}</h2>
    <p class="text-center text-grey-l1 text-sm md:text-left mb-6">{{ post.date.toDateString() }}</p>
    <div class="blog" v-html="content"></div>
  </div>
</template>

<script>
import Post from '~/util/post';

export default {
  fetch({ store, params }) {
    store.dispatch('posts/getAll');
    store.dispatch('posts/get', params.slug);
  },
  computed: {
    post() {
      return Post(this.$store.state.posts.selected);
    },
    content() {
      return require(`~/content/posts/${this.post.slug}.md`);
    },
  },
};
</script>
