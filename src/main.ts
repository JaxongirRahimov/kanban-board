import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {CoPlus, PxDashbaord, CoPencil, CoTrash, IoCloseCircleOutline, CoHamburgerMenu, IoCloseOutline, CoMoon, CoSun} from "oh-vue-icons/icons"
import App from './App.vue'
import {useThemeToggle} from "./composables/themeToggle";

const {isDarkMode, toggleTheme} = useThemeToggle();

import './assets/main.css'

addIcons(CoPlus, PxDashbaord, CoPencil, CoTrash, IoCloseCircleOutline, CoHamburgerMenu, IoCloseOutline, CoMoon, CoSun);

const app = createApp(App)

app.use(createPinia())

app.provide("theme-mode", {isDarkMode, toggleTheme});

app.component("v-icon", OhVueIcon);

app.mount('#app')
