import {ref} from "vue";
import {getCurrentThemeMode, persistCurrentThemeMode} from "../utils/themeToggleStorage";

export const useThemeToggle = ()=>{
    const isDarkMode = ref(getCurrentThemeMode());

    const toggleTheme = ()=>{
        isDarkMode.value = !isDarkMode.value;
        persistCurrentThemeMode(isDarkMode.value);
    }
    return {isDarkMode, toggleTheme}
}