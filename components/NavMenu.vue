<template>
  <ul class="flex justify-center items-center pr-6">
    <li>
      <nuxt-link :class="linkClass" to="/about">About</nuxt-link>
    </li>
    <li>
      <nuxt-link :class="linkClass" to="/projects">Projects</nuxt-link>
    </li>
    <li>
      <nuxt-link :class="linkClass" to="/blog">Blog</nuxt-link>
    </li>
    <!-- <li>
      <nuxt-link :class="linkClass" to="/uses">Uses</nuxt-link>
    </li>-->
    <li>
      <nuxt-link :class="linkClass" to="/contact">Contact</nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      linkClass:
        'text-gray-500 lg:text-lg font-medium pb-2 mx-4 border-b-2 border-transparent hover:text-green-200 hover:border-green-200',
    };
  },
};
</script>
