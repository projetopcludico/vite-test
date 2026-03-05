<script setup>
    import { onMounted, ref } from 'vue';
    import { RouterLink } from 'vue-router';
    import { useRouter } from 'vue-router';
    const router = useRouter();

    const routes = router.getRoutes().filter((route) => route.meta.isView);
</script>
<template>
    <header class="flex w-screen h-20 px-20 bg-cyan-950 text-white justify-between items-center">
        <h1 class="text-4xl">{{ router.currentRoute.value.meta.title }}</h1>
        <nav>
            <ul class="flex items-center gap-5">
                <RouterLink v-for="(route, index) in routes" :key="index" :to="route.path">
                    {{ route.meta.title }}
                </RouterLink>
            </ul>
        </nav>
    </header>
</template>