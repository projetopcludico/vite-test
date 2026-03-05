<script setup>
    import DificultyList from '../components/DificultyList.vue';

    import { useAplicationStore } from '../stores/aplication';
    const aplicationStore = useAplicationStore();

    const dificulties = {...aplicationStore.aplication.themes.forms.difficulties};
</script>
<template>
    <h1 class="text-4xl text-blue-500">Dificuldades:</h1>
    <DificultyList :list="dificulties" router-name="form-game"/>
</template>