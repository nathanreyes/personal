<template>
  <div class='post'>
    <nuxt-link
      class='link'
      :to='`/${slug}`'>
      <h2 class='text-3xl text-center text-brown-darkest hover:text-brown-darker capitalize mb-2 md:text-left'>
        {{ title }}
      </h2>
    </nuxt-link>
    <p class='text-center text-brown text-sm md:text-left'>
      {{ date.toDateString() }}
    </p>
    <img class='block mx-auto md:w-3/4 mb-6' :src='img' />
    <p class='summary'>
      {{ summary }}
    </p>
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
