<script setup lang="ts">
import type {IThemeMode} from "@/types/theme-mode";
import {inject} from "vue";
import { useBoardStore } from '@/stores/board';

const board = useBoardStore();

const {isDarkMode} = inject("theme-mode") as IThemeMode;

</script>
<template>
    
    <p class="board-amount" :class="{'board-amount--light-mode': !isDarkMode}">
        ALL BOARDS ( {{ board.boardAmount }} )
    </p>
</template>
<style scoped>
.board-amount {
    color: hsl(226, 10%, 73%);
    font-weight: 600;
    margin-bottom: 25px;
}
.board-amount--light-mode {
    color: #777;
}
</style>