import {ref} from "vue";

export const useModel = ()=>{
    const isModelOpen = ref(false);

    const toggleModel = ()=>{
        isModelOpen.value = !isModelOpen.value;
    }
    return {isModelOpen, toggleModel}
}

