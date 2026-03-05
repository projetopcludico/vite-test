<script setup>
    import { RouterLink } from 'vue-router';
    import { useRouter } from 'vue-router';
    const router = useRouter();

    const props = defineProps({
        list: {
            type: Array,
            required: true
        }
    })
</script>
<template>
    <ul class="flex flex-col px-6 py-2 gap-2 border-l-2 border-cyan-950 rounded-md w-100">
      <RouterLink
        class="shadow-lg p-4 rounded-md w-full bg-blue-500/10"
        v-for="(item, index) of props.list"
        :key="index"
        :to="item.path"
      >
        {{ item.title }}
      </RouterLink>
    </ul>
</template>