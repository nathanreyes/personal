<template>
  <div class="post">
    <nuxt-link class="link no-underline mb-4" :to="`/blog/${slug}`">{{ title }}</nuxt-link>
    <p
      class="text-center text-sm text-grey-l2 tracking-wide md:text-left mb-3"
    >{{ date.toDateString() }}</p>
    <!-- <p class="text-grey-l1" :style="{ textOverflow: 'ellipsis' }">{{ summary }}</p> -->
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    date: Date,
    slug: String,
    img: String,
    summary: String,
  },
};
</script>
