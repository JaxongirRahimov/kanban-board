<script setup lang="ts">
    import {ref, computed, inject} from "vue"
    import { useBoardStore } from "@/stores/board";
    
    const props = defineProps(["editBoardId", "getEditBoardId"])

    const board = useBoardStore();
    const editedBoard = computed(()=> board.boards.find(board => board.id === props.editBoardId))
    const isBoardOpen = ref(true);
    const boardName = ref(editedBoard.value?.boardName!);
    const error = ref("");


    const hasDuplicateBoard = (boardName: string)=>{
        return board.boards.some(board => board.boardName === boardName);
    }

    const toggleBoard = ()=>{
        isBoardOpen.value = !isBoardOpen.value;
        error.value = "";
        boardName.value = "";
        props.getEditBoardId("")
    }

    const handleEditBoardSubmit = ()=>{
        if(hasDuplicateBoard(boardName.value)){
            error.value = "Board already exists!"
        } else if(!boardName.value.length){
            error.value = "Board can't be empty!"
        } else if(boardName.value.length > 25){
            error.value = "Maximum board length is 25!"
        } else {
            board.editBoard(boardName.value, props.editBoardId)
            isBoardOpen.value = false;
            error.value = "";
            boardName.value = "";
            props.getEditBoardId("");
        }
    }

    const {isDarkMode} = inject("theme-mode");

</script>
<template>
    <div class="edit-board" :class="{'edit-board__light-mode': !isDarkMode}">
        <form @submit.prevent="handleEditBoardSubmit" v-if="isBoardOpen" class="edit-board__form">
            <input type="text" v-model.trim="boardName" class="edit-board__input" placeholder="Add board..."/>
            <p v-if="error" class="form__error-message">{{ error }}</p>
            <div class="edit-board__btns-box">
                <button type="submit" class="edit-board__add-board-btn">Edit Board</button>
                <button type="button" @click="toggleBoard" class="edit-board__cancel-btn">Cancel</button>
            </div>
        </form>
    </div>
</template>
<style scoped>
.edit-board__text {
    display: flex;
    gap: 10px;
    cursor: pointer;
    color: hsl(242, 47%, 60%);
    font-size: 16px;
    font-weight: 600;
}
.edit-board__light-mode .edit-board__input {
    color: #333;
}
.edit-board__input {
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
.edit-board__btns-box {
    display: flex;
    gap: 10px;
    margin-top: 15px;
}
.edit-board__btns-box * {
    flex: 1;
    padding: 7px 0;
    border-radius: 5px;
}
.edit-board__add-board-btn {
    background: hsl(24, 91%, 53%);
    color: #fff;
}
.edit-board__light-mode .edit-board__cancel-btn {
    border: 1px solid #111;
}
</style>