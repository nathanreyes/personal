<template>
  <ul class="list-reset navbar-menu flex justify-center items-center pr-6">
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
        'text-grey-l1 lg:text-lg no-underline font-medium pb-2 mx-4 border-b-2 border-transparent hover:text-green-l4 hover:border-green-l4',
    };
  },
};
</script>
