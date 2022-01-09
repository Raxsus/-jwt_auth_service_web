<script setup>

import Header from "./components/Header.vue";
</script>

<script>
  export default {
    name: 'app',
  }
</script>

<template>
  <Header />
  <div>
    <router-view></router-view>
  </div>
  
</template>

<style>
</style>
