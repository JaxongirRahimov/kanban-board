<script setup lang="ts">
    import {inject} from "vue";
    defineProps(["activeBoard", "toggleAddTaskModel"]);

    const {isDarkMode} = inject("theme-mode");
</script>
<template>
    <header class="header" :class="{'header__light-mode': !isDarkMode}">
        <h2 class="header__active-board">
            {{activeBoard.boardName}}
        </h2>
        <button v-if="activeBoard.id" @click="toggleAddTaskModel" class="header__btn">
            <v-icon class="header__icon" name="co-plus"/>
            Add New Task</button>
    </header>
</template>
<style scoped>
.header {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 90px;
    padding: 10px 20px;
    border-left: 1px solid #626262;
    background: hsl(240, 12%, 25%);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
}
.header__light-mode {
    background: #fff;
    color: #333;
    border-left: 1px solid #eee;
}
.header__active-board {
    font-size: clamp(1.2rem, calc(1vw + 1rem), 1.5rem);
    font-weight: 600;
    cursor: pointer;
}
.header__btn {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 15px 20px;
    background: hsl(242, 47%, 57%);
    color: #fff;
    border-radius: 25px;
}
</style>
