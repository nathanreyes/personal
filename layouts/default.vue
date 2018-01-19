<template>
  <div class='layout'>
    <div class='navbar'>
      <div class='container'>
        <div class='navbar-logo'>
          <nuxt-link to='/'>
            <h4>Nathan Reyes</h4>
          </nuxt-link>
        </div>
        <div class='navbar-menu'>
          <ul>
            <li><nuxt-link to='/projects'>Projects</nuxt-link></li>
            <li><nuxt-link to='/about'>About</nuxt-link></li>
          </ul>
        </div>
      </div>
    </div>
    <div class='content'>
      <div class='container'>
        <nuxt/>
      </div>
    </div>
    <footer class='footer'>
      <div class='container'>
        © 2018 Nathan Reyes
      </div> 
    </footer>
  </div>
</template>
