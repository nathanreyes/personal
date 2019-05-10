<template>
  <div class="flex flex-col min-h-screen relative font-sans bg-white">
    <div class="home">
      <site-header/>
    </div>
    <div class="flex-grow py-4">
      <div class="px-6 pb-10 text-lg text-gray-800 leading-normal">
        <nuxt/>
      </div>
    </div>
    <site-footer></site-footer>
  </div>
</template>

<script>
import SiteHeader from '~/components/SiteHeader';
import SiteFooter from '~/components/SiteFooter';

export default {
  components: {
    SiteHeader,
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
  /* background-color: red; */
  background-image: linear-gradient(to bottom right, #3d4457, #3e5679, #3e5679);
}

.profile-img {
  left: 20px;
  top: 20px;
  width: 80px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  background-image: url('~/assets/images/profile.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
</style>