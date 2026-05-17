<script setup>
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <NavBar />
  <main class="container-fluid py-4 px-3 px-md-4 px-lg-5">
    <router-view />
  </main>
  <FooterBar />
</template>
