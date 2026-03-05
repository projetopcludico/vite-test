<script setup>
import { RouterView } from 'vue-router';
import AppHeader from './components/layouts/AppHeader.vue';
</script>
<template>
  <AppHeader/>
  <div class="p-20">
    <RouterView/>
  </div>
</template>