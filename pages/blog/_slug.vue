<template>
  <div class="max-w-xl mx-auto py-6">
    <h2 class="text-xl text-gray-700 font-medium mb-2">{{ post.title }}</h2>
    <p
      class="text-center text-gray-500 text-sm font-semibold md:text-left mb-6"
    >{{ post.date.toDateString() }}</p>
    <div class="blog" v-html="content"></div>
  </div>
</template>

<script>
import Post from '~/util/post';

export default {
  layout: 'blog',
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

<style lang="postcss">
.blog {
  $ h1 {
    @apply .text-3xl;
  }
  & h2 {
    @apply .text-2xl;
  }
  & h3 {
    @apply .font-medium .text-lg .text-blue-500;
  }
  & h1,
  & h2 {
    @apply .mb-3;
  }
  & h3,
  & h4,
  & h5 {
    @apply .mb-4;
  }
  & p {
    @apply .mb-3 .text-gray-700 .leading-relaxed;
  }
  & ul {
    @apply .list-disc;
  }
  & ul,
  & ol {
    @apply .p-0 .mb-6;
  }
  & li {
    @apply .font-semibold .text-gray-600 .tracking-wide .text-base .my-4 .pl-2 .-ml-2;
  }
  & a {
    @apply .text-green-100 .font-medium;
  }
  & img {
    @apply .block .mx-auto .py-6;
  }
}
</style>
