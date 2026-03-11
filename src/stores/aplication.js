import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { defaultAplication } from "../static/defaultAplication";

export const useAplicationStore = defineStore('aplicationStore', () => {
    
    const aplication = reactive({...defaultAplication});

    const currentDificulty = ref("");
    const countResponses = ref(0);

    function setDificulty(dificulty) {
        if(typeof dificulty === 'string' && dificulty) {
            currentDificulty.value = dificulty;
        }
    }

    function incrementResponse() {
        countResponses.value++
    }

    return {
        aplication,
        currentDificulty,
        countResponses,
        setDificulty,
        incrementResponse
    }
})