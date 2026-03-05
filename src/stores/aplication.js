import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { defaultAplication } from "../static/defaultAplication";

export const useAplicationStore = defineStore('aplicationStore', () => {
    
    const aplication = reactive({...defaultAplication});

    const currentDificulty = ref("");
    const countResponses = ref(0);

    return {
        aplication,
        currentDificulty,
        countResponses
    }
})