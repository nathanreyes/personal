<template>
  <div class="home flex flex-col min-h-screen relative font-sans">
    <site-header/>
    <div class="flex-grow my-4">
      <div class="px-6 pb-10 text-lg text-gray-400 leading-normal">
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
};
</script>

<style scoped>
.home {
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