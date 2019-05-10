<template>
  <div class="home flex flex-col min-h-screen relative font-sans">
    <div class="navbar px-6 py-6">
      <div class="container h-full mx-auto flex flex-col items-center relative">
        <nav-menu></nav-menu>
      </div>
      <github-tag/>
    </div>
    <div class="flex-grow my-4">
      <div class="container mx-auto px-6 pb-10 text-lg text-gray-400 leading-relaxed">
        <nuxt/>
      </div>
    </div>
    <site-footer></site-footer>
  </div>
</template>

<script>
import NavMenu from '~/components/NavMenu';
import GithubTag from '~/components/GithubTag';
import SiteFooter from '~/components/SiteFooter';

export default {
  components: {
    NavMenu,
    GithubTag,
    SiteFooter,
  },
  data() {
    return {
      linkClass:
        'text-gray-100 lg:text-lg font-medium pb-2 mx-4 border-b-2 border-transparent hover:text-green-l4 hover:border-green-l4',
    };
  },
};
</script>

<style scoped>
.home {
  background-image: linear-gradient(to bottom right, #3d4457, #3e5679, #3e5679);
}
</style>