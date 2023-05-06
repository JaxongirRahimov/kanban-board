<script setup lang="ts">
import type {IThemeMode} from "@/types/theme-mode";
import { useBoardStore } from '@/stores/board';
import {ref, computed, inject} from "vue"
const props = defineProps(["isDeleteModelOpen", "toggleDeleteModel", "deleteBoardId", "removeActiveBoard"])

const confirmationText = ref("");

const board = useBoardStore();

const toBeDeletedBoard = computed(()=>
 board.boards.find(board => board.id === props.deleteBoardId)!);

const handleDeleteBoardClick = ()=>{
    props.removeActiveBoard({})
    board.deleteBoard(props.deleteBoardId);
    props.toggleDeleteModel();
    confirmationText.value = "";
}

const {isDarkMode} = inject("theme-mode") as IThemeMode;

</script>
<template>
    <div class="model-wrapper" :class="[isDeleteModelOpen ? 'active' : '', !isDarkMode ? 'model-wrapper__light-mode' : '']">
        <div class="model">
            <header class="model__header">
                <h3 class="model__title">
                    Delete a Board
                </h3>
                <button @click="toggleDeleteModel" class="model__cancel-btn"><v-icon name="io-close-outline"/></button>
            </header>
            <div class="model__body">
                <p class="model__description">
                    You are deleting board! "{{ toBeDeletedBoard?.boardName }}". All the tasks associated with this board will also be deleted! If you are sure about that type "I'm sure that I want to delete this board!" in the input below
                </p>
                <footer class="model__footer">
                    <strong class="model__strong">
                    Type: I'm sure that I want to delete this board!
                    </strong>
                    <input type="text" v-model="confirmationText" class="model__confirmation-input" placeholder="Enter confirmation...">
                    <button @click="handleDeleteBoardClick" :disabled="confirmationText !== 'I\'m sure that I want to delete this board!' ? true : false" class="model__confirmation-btn">I understand consequences</button>
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
    color: #666;
}
.model-wrapper__light-mode .model__title {
    color: #333;
}
.model-wrapper__light-mode .model__confirmation-input {
    background: #eee;
    color: #333;
}
.model-wrapper__light-mode .model__confirmation-btn {
    border: 1px solid #666;
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
.model__strong {
    display: inline-block;
    margin-bottom: 7px;
    font-weight: bold;
}
.model__confirmation-input {
    display: block;
    width: 100%;
    padding: 10px 5px;
    background: transparent;
    border: 1px solid #5c5c5c;
    border-radius: 5px;
    background: hsl(240, 12%, 23%);
    color: #fff;
}
.model__confirmation-btn {
    display: block;
    width: 100%;
    margin-top: 10px;
    padding: 10px 0;
    border-radius: 5px;
    background: hsl(0, 69%, 32%);
    color: #fff;
    transition: all .3s ease-out;
}
.model__confirmation-btn:hover {
    background: hsl(0, 69%, 25%);
}
.model__confirmation-btn:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background: #fff;
    color: #111;
}

</style>