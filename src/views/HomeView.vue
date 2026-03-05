<script setup>
    import RouteList from '../components/RouteList.vue';
    const gameList = [
        { title: "Jogo de Formas", path: "/forms" },
        { title: "Jogo de Sons", path: "/sounds" },
        { title: "Jogo de Números", path: "/numbers" },
    ];
</script>
<template>
  <div class="flex flex-col gap-5">
    <h1 class="text-4xl text-blue-500">Aplicação de Teste:</h1>
    <RouteList :list="gameList"/>
  </div>
</template>
