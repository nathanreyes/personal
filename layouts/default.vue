<template>
  <div class='flex flex-col min-h-screen relative font-sans'>
    <div class='navbar px-6'>
      <div class='container h-full mx-auto flex flex-col items-center relative'>
        <div class='profile-img mt-8 md:absolute md:mt-0'></div>
        <ul class='list-reset w-full navbar-menu flex justify-center items-center'>
          <li>
            <nuxt-link :class='linkClass' to='/'>Articles</nuxt-link>
          </li>
          <li>
            <nuxt-link :class='linkClass' to='/projects'>Projects</nuxt-link>
          </li>
          <li>
            <nuxt-link :class='linkClass' to='/about'>About</nuxt-link>
          </li>
        </ul>
      </div>
      <a
        href='https://github.com/nathanreyes'
        class='github-corner'
        aria-label='View source on Github'>
        <svg
          width='80'
          height='80'
          viewBox='0 0 250 250'
          style='fill:#8a8a75; color:#fff; position: absolute; top: 0; border: 0; right: 0;'
          aria-hidden='true'>
          <path d='M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z'></path>
          <path d='M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2' fill='currentColor' style='transform-origin: 130px 106px;' class='octo-arm'></path>
          <path d='M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z' fill='currentColor' class='octo-body'></path>
        </svg>
      </a>
      <style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>
    </div>
    <div class='flex-grow my-4'>
      <div class='container mx-auto px-6'>
        <nuxt/>
      </div>
    </div>
    <footer class='flex-no-shrink bg-brown-lightest border-t border-brown-lighter'>
      <div class='container mx-auto flex justify-center items-center py-8 text-brown-dark'>
        © 2018 NATHAN REYES
      </div> 
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linkClass:
        'text-brown-darker hover:text-brown-dark cursor-pointer font-semibold flex-no-shrink uppercase truncate py-4 px-2',
    };
  },
};
</script>

<style lang='sass' scoped>

$profile-size: 80px

.profile-img
  left: 20px
  top: 20px
  width: $profile-size
  height: $profile-size
  border-radius: 10px
  overflow: hidden
  background-image: url('~/assets/images/profile.jpg')
  background-repeat: no-repeat
  background-size: cover
  background-position: 50% 50%

.navbar-menu
  min-height: 140px  

</style>