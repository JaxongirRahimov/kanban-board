<script setup lang="ts">
import NavbarComp from '@/components/NavbarComp.vue';
import SidebarComp from '@/components/SidebarComp.vue';
import TaskList from '@/components/TaskList.vue';
import AddTaskModel from "@/components/AddTaskModel.vue"
import DeleteModal from '@/components/DeleteModal.vue';
import ViewTaskModel from '@/components/ViewTaskModel.vue';
import EditTaskModel from '@/components/EditTaskModel.vue';

import {ref, inject} from "vue";
import type {IBoard} from "@/types/board";
import type { ITask } from '@/types/task';
import {useModel} from "@/composables/modal";
import type {IThemeMode} from "@/types/theme-mode";

const activeBoard = ref({});
const activeTask = ref({});

const {isModelOpen: isAddTaskModelOpen, toggleModel: toggleAddTaskModel} = useModel();
const {isModelOpen: isDeleteModelOpen, toggleModel: toggleDeleteModel} = useModel();
const {isModelOpen: isActiveTaskModelOpen, toggleModel: toggleActiveTaskModel} = useModel();
const {isModelOpen: isEditTaskModelOpen, toggleModel: toggleEditTaskModel} = useModel();


const deleteBoardId = ref("");
const editBoardId = ref("");

const getActiveBoard = (board: IBoard)=>{
  activeBoard.value = board;
}
const getEditBoardId = (boardId: string)=>{
  editBoardId.value = boardId;
}
const getDeleteBoardId = (boardId: string)=> {
  deleteBoardId.value = boardId;
}
const updateActiveBoard = (board: IBoard)=>{
  activeBoard.value = board;
}
const removeActiveBoard = ()=> {
  activeBoard.value = {}
}

const getActiveTask = (task: ITask)=>{
  activeTask.value = task;
}
const removeActiveTask = ()=>{
  activeTask.value = {}
}


const {isDarkMode} = inject("theme-mode") as IThemeMode;

</script>

<template>
   
<div class="wrapper" :class="[!isDarkMode ? 'wrapper__light-mode' : '']">
    <div class="container">
      <SidebarComp 
      :activeBoard="activeBoard" 
      :removeActiveBoard="removeActiveBoard" 
      :getActiveBoard="getActiveBoard"
      :getEditBoardId="getEditBoardId"
      :editBoardId="editBoardId"
      :toggleDeleteModel="toggleDeleteModel"
      :getDeleteBoardId="getDeleteBoardId"
      />
      <main>
        <NavbarComp :activeBoard="activeBoard" :toggleAddTaskModel="toggleAddTaskModel"/>
        <TaskList :activeBoard="activeBoard" :getActiveTask="getActiveTask" :toggleActiveTaskModel="toggleActiveTaskModel"/>
        <AddTaskModel v-if="isAddTaskModelOpen" :activeBoard="activeBoard" :isAddTaskModelOpen="isAddTaskModelOpen" :toggleAddTaskModel="toggleAddTaskModel"/>
        <DeleteModal v-if="isDeleteModelOpen" :removeActiveBoard="removeActiveBoard" :deleteBoardId="deleteBoardId" :isDeleteModelOpen="isDeleteModelOpen" :toggleDeleteModel="toggleDeleteModel"/>
        <ViewTaskModel v-if="isActiveTaskModelOpen" :getActiveTask="getActiveTask" :activeBoard="activeBoard" :activeTask="activeTask" :isActiveTaskModelOpen="isActiveTaskModelOpen" :toggleActiveTaskModel="toggleActiveTaskModel"  :toggleEditTaskModel="toggleEditTaskModel" :removeActiveTask="removeActiveTask"/>
        <EditTaskModel  v-if="isEditTaskModelOpen" :updateActiveBoard="updateActiveBoard" :activeBoard="activeBoard" :activeTask="activeTask" :isEditTaskModelOpen="isEditTaskModelOpen" :toggleEditTaskModel="toggleEditTaskModel"/>
      </main>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  min-height: 100vh;
  background: hsl(240, 14%, 15%);
}
.container {
  display: flex;
  min-height: 960px;
}
main {
  flex: 1;
}
.wrapper__light-mode {
  background: #f5f5f5;
}
</style>
