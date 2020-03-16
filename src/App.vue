<template>
  <div id="app">
    <!-- title and hamburger -->
    <header>
      <h1 class="title">Corona HQ</h1>
      <div class="menu" :class="{ 'menu-open': menuOpen }" @click="toggleMenu">
        <div class="hamburger"></div>
      </div>
    </header>

    <!-- naviation (offscreen when mobile) -->
    <nav class="nav">
      <ul class="nav__list" :class="{ 'nav__list-open': menuOpen }">
        <li @click="toggleMenu" class="nav__item" :class="{ 'nav__item-open': menuOpen }">
          <router-link to="/" class="nav__link">Global</router-link>
        </li>
        <li @click="toggleMenu" class="nav__item" :class="{ 'nav__item-open': menuOpen }">
          <router-link to="/IE" class="nav__link">Ireland</router-link>
        </li>
        <li @click="toggleMenu" class="nav__item" :class="{ 'nav__item-open': menuOpen }">
          <router-link to="/GB" class="nav__link">UK</router-link>
        </li>
        <li @click="toggleMenu" class="nav__item" :class="{ 'nav__item-open': menuOpen }">
          <router-link to="/ES" class="nav__link">Spain</router-link>
        </li>
        <li @click="toggleMenu" class="nav__item" :class="{ 'nav__item-open': menuOpen }">
          <router-link to="/DE" class="nav__link">Germany</router-link>
        </li>
        <li @click="toggleMenu" class="nav__item" :class="{ 'nav__item-open': menuOpen }">
          <router-link to="/HR" class="nav__link">Croatia</router-link>
        </li>
        <!-- TODO - add Scotland -->
      </ul>
    </nav>

    <!-- main stats -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>

<style></style>
