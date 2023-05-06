<script setup lang="ts">
    import { ref, computed, inject } from 'vue';
    import { useTaskStore } from '@/stores/task';
    import type {IThemeMode} from "@/types/theme-mode";
    import type { ISubTask, ITask } from '@/types/task';
    const props = defineProps(["removeActiveTask", "getActiveTask", "activeTask", "activeBoard", "toggleActiveTaskModel", "toggleEditTaskModel", "isActiveTaskModelOpen"])


    const completedSubtasks = computed(()=> props.activeTask.subtasks?.filter((subtask: ISubTask) => subtask.completed).length);
    const status = ref(props?.activeTask?.status);

    const tasks = useTaskStore();
     
    const handleSubtaskStatusChange = (subtaskId: string)=>{
        tasks.toggleSubtask(subtaskId, props.activeTask.id, props.activeBoard.id);
        console.log(tasks.tasks)
        props.getActiveTask(tasks.tasks.find((task: ITask) => task.id === props.activeTask.id)!);
    }
    const handleTaskStatusChange = ()=>{
        tasks.changeTaskStatus(props.activeTask.id, status.value, props.activeBoard.id);
        status.value = "";
        props.toggleActiveTaskModel();
    }
    const handleDeleteTaskClick = (taskId: string)=>{
        tasks.deleteTask(taskId, props.activeBoard.id)
        props.removeActiveTask();
        props.toggleActiveTaskModel();
    }
    const handleEditTaskClick = ()=>{
        props.toggleActiveTaskModel();
        props.toggleEditTaskModel();
    }

    const {isDarkMode} = inject("theme-mode") as IThemeMode;

 
</script>
<template>
   <div class="model-wrapper" :class="[isActiveTaskModelOpen ? 'active' : '', !isDarkMode ? 'model-wrapper__light-mode' : '']">
        <div class="model">
            <header class="model__header">
                <h3 class="model__title">
                    {{activeTask.title}}
                </h3>
                <button @click="toggleActiveTaskModel" class="model__cancel-btn"><v-icon name="io-close-outline"/></button>
            </header>
            <div class="model__body">
                <p class="model__text">{{ activeTask.description }}</p>
                <section class="subtasks" v-if="activeTask.subtasks.length">
                    <h4 class="subtasks__label subtasks__title">
                       Subtasks ({{ completedSubtasks }} of {{ activeTask?.subtasks?.length }}) 
                    </h4>
                    <div v-for="({id, subtask, completed}) in activeTask.subtasks" :key="id" class="subtasks__checkbox-box">
                        <input type="checkbox" :id="id" :checked="completed" @change="handleSubtaskStatusChange(id)" class="subtasks__checkbox">
                        <label :for="id" :class="{subtasks__completed: completed}" class="subtasks__label subtasks__checkbox-label" >{{ subtask }}</label>
                    </div>
                    <div class="subtasks__task-status-box">
                        <label for="status" class="subtasks__label">Status</label>
                        <select id="status" @change="handleTaskStatusChange" class="subtasks__select" v-model="status">
                            <option value="TODO">Todo</option>
                            <option value="DOING">Doing</option>
                            <option value="DONE">Done</option>
                        </select>
                    </div>
                </section>
                <footer class="model__footer">
                    <div class="model__btns-box">
                        <button @click="handleEditTaskClick" class="model__btn model__edit-btn">
                            Edit
                        </button>
                        <button @click="handleDeleteTaskClick(activeTask.id)" class="model__btn model__delete-btn">
                            Delete
                        </button>
                        <button @click="toggleActiveTaskModel" class="model__btn model__close-btn">
                            Cancel
                        </button>
                </div>
                </footer>
            </div>
        </div>
    </div>
</template>
<style scoped>
.model-wrapper {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9;
    background: rgba(0,0,0,.7);
    display: none;
}
.model-wrapper.active {
    display: flex;
}
.model-wrapper__light-mode .model {
    background: #fff;
}
.model-wrapper__light-mode .model__title {
    color: #333;
}
.model-wrapper__light-mode .model__text {
    color: #555;
}
.model-wrapper__light-mode .subtasks__checkbox-box {
    background: #e5e5e5;
}
.model-wrapper__light-mode .subtasks__title {
    color: #555;
}
.model-wrapper__light-mode .subtasks__checkbox-label {
    color: #555;
}
.model-wrapper__light-mode .subtasks__select {
    background: #e5e5e5;
    color: #333;
}
.model {
    position: relative;
    max-width: 550px;
    width: 90%;
    margin: 25px 0;
    padding: 25px;
    border-radius: 5px;
    background: hsl(240, 12%, 25%);
}

.model__header {
    margin-bottom: 25px;
    border-bottom: 1px solid #5a5a5a;
}
.model__title {
    font-size: clamp(1.2rem, calc(1vw + 1rem), 1.5rem);
}
.model__text {
    color: hsl(226, 10%, 73%);
    font-weight: 500;
}
.model__cancel-btn {
    position: absolute;
    top: 20px;
    right: 15px;
    background: rgba(255, 255, 255, .4);
    border: 2px solid rgba(0,0,0,.1);
}

.model__footer {
    margin-top: 20px;
}
.model__btns-box {
    display: flex;
    align-items: center;
    gap: 15px;
}
.model__btn {
    padding: 10px 20px;
    border-radius: 5px;
}
.model__edit-btn {
    background: hsl(24, 91%, 53%);
    color: #fff;
}
.model__delete-btn {
    background: #cd1913;
    color: #fff;
}

.subtasks {
    margin: 25px 0;
}
.subtasks__title {
    margin-bottom: 10px;
}
.subtasks__label {
    font-weight: 600;
    font-size: 17px;
}
.subtasks__checkbox-box {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background: hsl(240, 14%, 15%);
}
.subtasks__checkbox-label {
    display: inline-block;
    margin-left: 15px;
}
.subtasks__completed {
    color: hsl(226, 10%, 73%);
    text-decoration: line-through;
}
.subtasks__checkbox {
    width: 15px;
    height: 15px;
}
.subtasks__task-status-box {
    margin-top: 25px;
}
.subtasks__select {
    display: block;
    width: 100%;
    padding: 15px 5px;
    background: transparent;
    border: 1px solid #5c5c5c;
    border-radius: 5px;
    background: hsl(240, 12%, 23%);
    color: #fff;
}


</style>