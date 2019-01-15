<template>
  <div class="max-w-md mx-auto">
    <post-list-item v-for="post in posts" :key="post.title" v-bind="post" class="mb-8"></post-list-item>
  </div>
</template>

<script>
import PostListItem from '~/components/PostListItem';
import Post from '~/util/post';

export default {
  layout: 'default',
  components: {
    PostListItem,
  },
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
