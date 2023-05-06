<script setup lang="ts">
import TaskItem from "./TaskItem.vue"
import type {IThemeMode} from "@/types/theme-mode";
import {computed, inject} from "vue"

const props = defineProps(["activeBoard", "getActiveTask", "toggleActiveTaskModel"])

const currentActiveBoard = computed(()=> props.activeBoard)

const TASKS = ["TODO", "DOING", "DONE"];

const todos = computed(()=> currentActiveBoard.value.tasks.filter((task: any) => task.status === "TODO").length)
const doing = computed(()=> currentActiveBoard.value.tasks.filter((task: any) => task.status === "DOING").length)
const done = computed(()=> currentActiveBoard.value.tasks.filter((task: any) => task.status === "DONE").length)
 

const {isDarkMode} = inject("theme-mode") as IThemeMode;

</script>
<template>
    <section v-if="currentActiveBoard.id" class="tasks" :class="{'tasks__light-mode': !isDarkMode}">
        <div class="tasks__row">
            <div v-for="TASK in TASKS" :key="TASK" class="tasks__column">
                <div class="tasks__header">
                    <span class="tasks__circle" :class="`tasks__circle--${TASK.toLowerCase()}`"></span>
                    <span class="tasks__task-amount">{{ TASK }} ( {{ TASK === "TODO" ? todos : TASK === "DOING" ? doing : done }} )</span>
                </div>
                <div v-for="task in currentActiveBoard.tasks" :key="task.id">
                    <TaskItem v-if="task && task.status === TASK" :task="task" :getActiveTask="getActiveTask" :toggleActiveTaskModel="toggleActiveTaskModel"/>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>
    .tasks {
        padding: 25px;
    } 
     
    .tasks__row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
    }
    .tasks__light-mode .tasks__task-amount {
        color: #333;
    }
    .tasks__header {
        margin-bottom: 25px;
        display: flex;
        align-items: center;
        gap: 15px;
    }
    .tasks__circle {
        width: 20px;
        height: 20px;
        border-radius: 50%;
    }
    .tasks__circle--todo {
        background: hsl(192, 71%, 59%);
    }
    .tasks__circle--doing {
        background: hsl(242, 47%, 57%);
    }
    .tasks__circle--done {
        background: rgb(46, 248, 154);
    }
</style>