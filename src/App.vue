<script setup>
import { RouterView } from 'vue-router';
import AppHeader from './components/layouts/AppHeader.vue';
</script>
<template>
  <AppHeader/>
  <div class="py-10 px-20">
    <RouterView/>
  </div>
</template>