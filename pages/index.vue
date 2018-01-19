<template>
<div>
  <section id='posts'>
    <div v-for='(post, i) in posts' :key='i'>
      <div
        class='light-divider'
        v-if='i !== 0'>
      </div>
      <post-list-item
        :post='post'>
      </post-list-item>
    </div>
  </section>
</div>
</template>

<script>
import PostListItem from '../components/PostListItem';
import Post from '~/util/post';

export default {
  components: {
    PostListItem,
  },
  fetch({ store }) {
    store.dispatch('posts/getAll');
  },
  computed: {
    posts() {
      return this.$store.state.posts.list.map(p => Post(p));
    }
  }
}
</script>

<style lang='sass' scoped>

.light-divider
  margin-bottom: 60px

</style>
