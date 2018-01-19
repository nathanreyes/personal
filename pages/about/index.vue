<template>
<div>
  <section class='profile'>
    <div class='profile-img'>
    </div>
    <div class='profile-content'>
      <h2>Howdy...</h2>
      <p>
        Welcome to my site. Here, you can see what I've worked on and my thoughts on development with Vue.js and productivity in general.
      </p>
    </div>
  </section>
</div>
</template>

<style lang='sass'>

@import '../../assets/site.sass'

$image-span: 160px

.profile
  display: flex
  justify-content: space-between
  align-items: center
  height: 200px
  width: 100%
  padding: 0 30px

.profile-img
  flex-grow: 0
  flex-shrink: 0
  width: $image-span
  height: $image-span
  border-radius: 50%
  overflow: hidden
  background-image: url('~/assets/profile.jpg')
  background-repeat: no-repeat
  background-size: cover
  background-position: 50% 50%

.profile-content
  flex-grow: 1
  margin-left: 60px
  p
    margin-top: 30px

</style>