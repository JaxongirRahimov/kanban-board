<script setup lang="ts">
import {inject} from "vue";

const {isDarkMode, toggleTheme} = inject("theme-mode");

</script>
<template>
    <div class="theme-toggle">
        <button v-if="!isDarkMode" @click="toggleTheme" class="theme-toggle__btn" :class="{'theme-toggle__light-mode-btn': !isDarkMode}">
            <v-icon name="co-moon"/>
        </button>
        <button v-if="isDarkMode" @click="toggleTheme" class="theme-toggle__btn">
            <v-icon name="co-sun"/>
        </button>
    </div>
</template>
<style scoped>
.theme-toggle {
    display: flex;
    justify-content: center;
}
.theme-toggle__btn {
    transform: scale(2.5);
    background: transparent;
    color: #fff;
}
.theme-toggle__light-mode-btn {
    color: #222;
}
</style>