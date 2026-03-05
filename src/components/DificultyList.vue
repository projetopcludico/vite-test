<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter();

    const props = defineProps({
        list: {
            type: Object,
            required: true
        },
        routerName: {
            type: String,
            default: 'home-view'
        }
    });
</script>

<template>
    <ul class="flex flex-col px-6 py-2 gap-2 border-l-2 border-cyan-950 rounded-md w-100">
      <button
        class="shadow-lg p-4 rounded-md w-full bg-blue-500/10"
        v-for="(item, index) of props.list"
        :key="index"
        @click="router.push({ name: props.routerName, params: item.params })"
      >
        {{ item.title }}
      </button>
    </ul>
</template>