import {ref} from "vue";

export const useThemeToggle = ()=>{
    const isDarkMode = ref(true);

    const toggleTheme = ()=>{
        isDarkMode.value = !isDarkMode.value;
    }
    return {isDarkMode, toggleTheme}
}