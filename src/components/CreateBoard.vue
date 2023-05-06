<script setup lang="ts">
    import {ref, inject} from "vue"
    import type {IThemeMode} from "@/types/theme-mode";
    import { useBoardStore } from "@/stores/board";

    const isBoardOpen = ref(false);
    const boardName = ref("");
    const error = ref("");

    const board = useBoardStore();


    const hasDuplicateBoard = (boardName: string)=>{
        return board.boards.some(board => board.boardName === boardName);
    }

    const toggleBoard = ()=>{
        isBoardOpen.value = !isBoardOpen.value;
        error.value = "";
        boardName.value = "";
    }

    const handleAddBoardSubmit = ()=>{
        if(hasDuplicateBoard(boardName.value)){
            error.value = "Board already exists!"
        } else if(!boardName.value.length){
            error.value = "Board can't be empty!"
        } else if(boardName.value.length > 25){
            error.value = "Maximum board length is 25!"
        } else {
            board.createBoard(boardName.value)
            isBoardOpen.value = false;
            error.value = "";
            boardName.value = "";
        }
    }
    const {isDarkMode} = inject("theme-mode") as IThemeMode;

</script>
<template>
    <div class="create-board" :class="{'create-board__light-mode': !isDarkMode}">
        <p v-if="!isBoardOpen" @click="toggleBoard" class="create-board__text">
            <span><v-icon name="px-dashbaord" class="create-board__icon"/></span>
            <span>
                <v-icon name="co-plus" class="create-board__icon"/> Create New Board
            </span>
        </p>
        <form @submit.prevent="handleAddBoardSubmit" v-if="isBoardOpen" class="create-board__form">
            <input type="text" v-model.trim="boardName" class="create-board__input" placeholder="Add board..."/>
            <p v-if="error" class="form__error-message">{{ error }}</p>
            <div class="create-board__btns-box">
                <button class="create-board__add-board-btn">Add Board</button>
                <button @click="toggleBoard" class="create-board__cancel-btn">Cancel</button>
            </div>
        </form>
    </div>
</template>
<style scoped>
.create-board__text {
    display: flex;
    gap: 10px;
    cursor: pointer;
    color: hsl(242, 47%, 60%);
    font-size: 16px;
    font-weight: 600;
}
.create-board__light-mode .create-board__input {
    color: #333;
}
.create-board__input {
    display: block;
    width: 100%;
    padding: 10px 5px;
    background: transparent;
    border: 2px solid hsl(242, 47%, 57%);
    border-radius: 5px;
    color: #fff;
}
.form__error-message {
    color: rgb(249, 31, 31);
    font-size: 14px;
    font-weight: 500;
}
.create-board__btns-box {
    display: flex;
    gap: 10px;
    margin-top: 15px;
}
.create-board__btns-box * {
    flex: 1;
    padding: 7px 0;
    border-radius: 5px;
}
.create-board__add-board-btn {
    background: hsl(242, 47%, 57%);
    color: #fff;
}
.create-board__light-mode .create-board__cancel-btn {
    border: 1px solid #111;
}
</style>