<template>
  <div class="navbar px-6 py-6">
    <div
      class="container max-w-3xl h-full mx-auto flex flex-col md:flex-row items-center md:items-baseline justify-between"
    >
      <nuxt-link to="/" class="text-sm md:text-base mb-6 md:mb-0 lg:text-lg font-medium">
        Nathan
        <span class="text-blue-200">Reyes</span>
      </nuxt-link>
      <nav-menu></nav-menu>
    </div>
    <github-tag/>
  </div>
</template>

<script>
import NavMenu from './NavMenu';
import GithubTag from './GithubTag';

export default {
  components: {
    NavMenu,
    GithubTag,
  },
};
</script>
