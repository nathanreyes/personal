<template>
  <div>
    <h2 class='text-brown-darkest capitalize mb-2'>
      {{ post.title }}
    </h2>
    <p class='text-center text-brown text-sm md:text-left'>
      {{ post.date.toDateString() }}
    </p>
    <div v-html='content'>
    </div>
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
