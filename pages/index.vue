<template>
  <div class="xl:max-w-lg mx-auto">
    <div class="hidden lg:flex mt-10 mb-8">
      <div class="max-w-xs flex-grow"></div>
      <h3 class="text-blue-l4 text-2xl font-medium">Howdy!</h3>
    </div>
    <div class="flex flex-col items-center lg:flex-row lg:items-start">
      <div class="max-w-xs flex-grow mb-4 lg:mb-0">
        <div class="profile-img shadow-md"></div>
      </div>
      <div class="mt-10 max-w-sm text-center lg:text-left lg:mt-0">
        <h3 class="lg:hidden text-blue-l4 text-2xl font-medium mb-6">Howdy!</h3>
        <p class="text-lg leading-normal mb-6">
          I’m
          <span class="text-grey-l5 font-medium">Nathan Reyes</span> and I like to make awesome stuff for the web.
          This includes building content management websites for community organizations like
          <a
            href="https://redeemerpampa.com"
            class="link"
          >Redeemer Pampa</a> and
          <a href="https://thewellpampa.com" class="link">The Well</a>, as well as founding popular open source projects like
          <a
            href="https://vcalendar.io"
            class="link"
          >V-Calendar</a>, a calendar and datepicker plugin for the popular frontend javascript framework Vue.js.
        </p>
        <p
          class="text-lg leading-normal mb-10"
        >Simply put, my passion lies in making life easier for folks when it comes to using and developing software.</p>
      </div>
    </div>
    <div class="flex flex-col items-center lg:flex-row">
      <div class="hidden lg:block max-w-xs flex-grow text-right">
        <h2 class="text-green-l4 font-normal mb-3 mr-16">Software Developer</h2>
        <p class="uppercase text-sm text-blue-l5 tracking-wide font-medium mr-16">Web & Desktop</p>
      </div>
      <div class="flex flex-col items-center lg:flex-row lg:items-baseline text-lg">
        <nuxt-link
          to="/about"
          class="cursor-pointer no-underline bg-green-l4 hover:bg-green-l3 text-green-d4 font-semibold px-6 py-4 rounded-full mr-2 shadow-lg hover:shadow-md"
        >Read more about me...</nuxt-link>
        <div class="mt-4">
          or
          <a href="/resume.pdf" target="_blank" class="link ml-1">download my resume</a>.
        </div>
      </div>
    </div>
    <div class="flex justify-center lg:justify-start">
      <div class="lg:max-w-xs lg:flex-grow flex justify-end">
        <!--SVG glyph-->
        <svg
          width="94"
          height="72"
          viewBox="0 0 94 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="mt-10 mr-16 fill-current text-grey"
        >
          <rect x="88" y="70" width="6" height="2" rx="1"></rect>
          <rect x="66" y="70" width="6" height="2" rx="1"></rect>
          <rect x="88" y="56" width="6" height="2" rx="1"></rect>
          <rect x="88" y="42" width="6" height="2" rx="1"></rect>
          <rect x="66" y="42" width="6" height="2" rx="1"></rect>
          <rect x="44" y="42" width="6" height="2" rx="1"></rect>
          <rect x="88" y="28" width="6" height="2" rx="1"></rect>
          <rect x="66" y="28" width="6" height="2" rx="1"></rect>
          <rect x="88" y="14" width="6" height="2" rx="1"></rect>
          <rect x="66" y="14" width="6" height="2" rx="1"></rect>
          <rect x="44" y="14" width="6" height="2" rx="1"></rect>
          <rect x="22" y="14" width="6" height="2" rx="1"></rect>
          <rect y="14" width="6" height="2" rx="1"></rect>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'home',
};
</script>

<style scoped>
.profile-img {
  left: 20px;
  top: 20px;
  width: 260px;
  height: 260px;
  border-radius: 10px;
  overflow: hidden;
  background-image: url('~/assets/images/profile.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
</style>

