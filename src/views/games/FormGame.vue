<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter();

    const params = {...router.currentRoute.value.params};

    const numberForms = Number(params.numberForms);
    const size = Number(params.size);
    const discover = Number(params.discover);
    const timeLimit = Number(params.timeLimit)

</script>

<template>
    <p>{{ numberForms }}</p>
    <p>{{ size }}</p>
    <p>{{ discover }}</p>
    <p>{{ timeLimit }}</p>
</template>