<script setup lang="ts">
    import BoardItem from './BoardItem.vue';
    import { useBoardStore } from '@/stores/board';
    
    defineProps(["getActiveBoard", "activeBoard", "resetBoard", "toggleDeleteModel", "getDeleteBoardId", "getEditBoardId"])
    const boards = useBoardStore();

    console.log(boards.boards, 0)
</script>
<template>
     
    <ul class="board-list">
        <BoardItem 
        v-for="board in boards.boards" 
        :key="board.id" 
        :board="board" 
        :getActiveBoard="getActiveBoard" 
        :resetBoard="resetBoard"
        :activeBoard="activeBoard"
        :toggleDeleteModel="toggleDeleteModel"
        :getDeleteBoardId="getDeleteBoardId"
        :getEditBoardId="getEditBoardId"
        />
    </ul>
</template>
<style scoped>
    .board-list {
        margin-bottom: 25px;
    }
</style>