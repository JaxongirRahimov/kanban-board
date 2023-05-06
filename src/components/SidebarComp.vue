<script setup lang="ts">
    import BoardAmount from './BoardAmount.vue';
    import BoardList from './BoardList.vue';
    import CreateBoard from './CreateBoard.vue';
    import EditBoard from './EditBoard.vue';
    import ThemeToggle from './ThemeToggle.vue';
    import type {IThemeMode} from "../types/theme-mode"
    import { ref, onMounted, inject } from 'vue';

    defineProps(["getActiveBoard", "activeBoard", "resetBoard", "toggleDeleteModel", "getDeleteBoardId", "getEditBoardId", "editBoardId"])

    const isSmallScreen = ref(false);
    const isMenuOpen = ref(false);

    onMounted(()=>{
        const handleResize = ()=>{
            const windowWidth = window.innerWidth;
            if(windowWidth < 960){
                isSmallScreen.value = true;
            } else {
                isSmallScreen.value = false;
            }
        }
        window.addEventListener("resize", handleResize);
        window.addEventListener("DOMContentLoaded", handleResize)
    });

    const {isDarkMode} = inject("theme-mode") as IThemeMode;
    
</script>
<template>
    <aside class="sidebar" :class="[isSmallScreen ?'sidebar__small-screen' : '', isMenuOpen ? 'sidebar__menu-open' : '', !isDarkMode ? 'sidebar__light-mode' : '']">
        <button @click="isMenuOpen=!isMenuOpen" v-if="isSmallScreen" class="sidebar__menu-btn">
            <v-icon name="co-hamburger-menu"/>
        </button>
        <div v-if="!isSmallScreen || isMenuOpen" class="sidebar__box">
            <div class="sidebar__top">
                <header class="sidebar__header">
                    <h1 class="sidebar__title">
                        kanboard  
                    </h1>
                </header>
                <BoardAmount/>
                <BoardList 
                :resetBoard="resetBoard" 
                :getActiveBoard="getActiveBoard" 
                :activeBoard="activeBoard"
                :toggleDeleteModel="toggleDeleteModel"
                :getDeleteBoardId="getDeleteBoardId"
                :getEditBoardId="getEditBoardId"
                />  
                <EditBoard v-if="editBoardId" :getEditBoardId="getEditBoardId" :editBoardId="editBoardId"/>
                <CreateBoard v-else/>
            </div>
            <div class="sidebar__bottom">
                <ThemeToggle/>
            </div>
        </div>
    </aside>
</template>
<style scoped>
.sidebar {
    position: relative;
    width: 250px;
    min-height: 100vh;
    background: hsl(240, 12%, 25%);
    transition: all .3s ease-out;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
    z-index: 9;
}
 
.sidebar__light-mode {
    background: #fff;
}
.sidebar__light-mode .sidebar__menu-btn {
    color: #111;
}
.sidebar__small-screen {
    min-width: 80px;
    max-width: 80px;
}
 
.sidebar__menu-open {
    position: fixed;
    min-width: 250px;
    max-width: 250px;
}
.sidebar__box {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    padding: 25px;
    display: flex; 
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
}
.sidebar__bottom {
    margin-bottom: 80px;
}
.sidebar__menu-btn {
    position: absolute;
    top: 35px;
    right: 35px;
    background: transparent;
    color: #fff;
    transform: scale(2);
    z-index: 9999;
}
.sidebar__header {
    margin-bottom: 25px;
}
.sidebar__title {
    font-size: clamp(1.2rem, calc(1.2vw + 1rem), 1.5rem);
    font-weight: 600;
    cursor: pointer;
}
.sidebar__light-mode .sidebar__title {
    color: #333;
}
</style>