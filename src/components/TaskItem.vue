<script setup lang="ts">
    import {computed, inject} from "vue"
    import type {IThemeMode} from "@/types/theme-mode";
    import type { ISubTask } from "@/types/task";

    const props = defineProps(["task", "getActiveTask", "toggleActiveTaskModel"])

    const completedSubtaskAmount = computed(()=> 
        props.task.subtasks.filter((subtask: ISubTask) => subtask.completed).length);

    const handleTaskClick = ()=>{
        props.getActiveTask(props.task);
        props.toggleActiveTaskModel();
    }

    const {isDarkMode} = inject("theme-mode") as IThemeMode;

</script>
<template>
    <div class="card" @click="handleTaskClick" :class="{'card__light-mode': !isDarkMode}">
        <p class="card__title">
            {{ task.title }}
        </p>
        <p class="card__text">
            {{ completedSubtaskAmount }} of {{ task.subtasks.length }} subtasks
        </p>
    </div>
</template>
<style scoped>
.card {
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
    background: hsl(240, 12%, 25%);
    cursor: pointer;
}
.card__light-mode {
    background: #fff;
}
.card__light-mode .card__title {
    color: #444;
}
.card__light-mode .card__text {
    color: #999;
}
.card__title {
    margin-bottom: 15px;
    font-size: clamp(1.2rem, calc(1vw + 1rem), 1.4rem);
    font-weight: 600;
}
.card__text {
    color: hsl(226, 10%, 73%);
    font-weight: 600;
}
</style>