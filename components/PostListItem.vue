<template>
  <div class='post'>
    <nuxt-link
      class='title link'
      :to='`/${post.slug}`'>
      <h2>{{ post.title }}</h2>
    </nuxt-link>
    <p class='date'>
      {{ post.date.toDateString() }}
    </p>
    <p class='summary'>
      {{ post.summary }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    post: Object,
  },
}
</script>
