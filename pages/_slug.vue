<template>
  <div>
    <h1 class='title'>
      {{ post.title }}
    </h1>
    <p class='date'>
      {{ post.date.toDateString() }}
    </p>
  </div>
</template>

<script>
import Post from '~/util/post';

export default {
  fetch ({store, params}) {
    store.dispatch('posts/getAll')
    store.dispatch('posts/get', params.slug)
  },
  computed: {
    post() {
      return Post(this.$store.state.posts.selected);
    },
  }
}
</script>
