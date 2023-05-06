<script setup lang="ts">
    import {inject} from "vue";
    const props = defineProps(["board", "getActiveBoard", "activeBoard", "resetBoard", "toggleDeleteModel", "getDeleteBoardId", "getEditBoardId"]);


    const handleDeleteBoardClick = (boardId: string)=>{
        props.toggleDeleteModel();
        props.getDeleteBoardId(boardId)  
    }  
    const {isDarkMode} = inject("theme-mode");

</script>

<template>
    <li @click="getActiveBoard(board)" class="board-list__item"
        :class="[activeBoard.id === board.id ? 'active' : '', !isDarkMode && activeBoard.id !== board.id ? 'board-list__item--light-mode' : '']"
    >
        <div>
            <v-icon name="px-dashbaord"/>
            {{ board.boardName }}
        </div>
        <div class="board-list__btns-box">
            <button @click="getEditBoardId(board.id)" class="board-list__btn board-list__edit-btn"><v-icon name="co-pencil"/></button>   
            <button @click="handleDeleteBoardClick(board.id)" class="board-list__btn board-list__delete-btn"><v-icon name="co-trash"/></button>
        </div>
    </li>
</template>
<style scoped>
.board-list__item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 5px;
    justify-content: space-between;
    padding: 15px 0;
    margin-top: 15px;
    margin-left: -25px;
    padding-left: 25px;
    padding-right: 10px;
    transition: all .3s ease-out;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    cursor: pointer;
}
.board-list__item--light-mode {
    color: #111;
}
.board-list__item--light-mode:hover {
    color: #fff;
}
.board-list__item.active {
    background: hsl(242, 47%, 57%);
}
.board-list__item:hover {
    background: hsl(242, 47%, 57%);
}
.board-list__btns-box {
    display: flex;
    align-items: center;
    gap: 8px;
}
.board-list__btn {
    background: transparent;
} 
.board-list__edit-btn {
    color: rgb(222, 153, 25);
}
.board-list__delete-btn {
    color: red;   
}

</style>