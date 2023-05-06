import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IBoard } from '@/types/board'
import { useTaskStore } from './task';
import {v4 as uuidv4} from "uuid";
import {
  getBoardsFromLocalStorage, 
  addBoardToLocalStorage,
  editBoardInLocalStorage,
  deleteBoardFromLocalStorage
} from "../utils/boardStorage";

export const useBoardStore = defineStore('board', () => {
  const boards = ref<IBoard []>(getBoardsFromLocalStorage())
  const tasks = useTaskStore()
  
  const createBoard = (boardName: string)=>{
    boards.value.push({id: uuidv4(), boardName, tasks: []});
    addBoardToLocalStorage(boards.value[boards.value.length - 1])
  }
  const editBoard = (boardName: string, editBoardId: string)=>{
    boards.value = boards.value.map(board => board.id === editBoardId ? {...board, boardName} : board);
    const editedBoard = boards.value.find(board => board.id === editBoardId)!;
    editBoardInLocalStorage(editedBoard)
  }
  const deleteBoard = (boardId: string)=>{
    tasks.tasks = tasks.tasks.filter(task => task.boardId !== boardId);
    const boardIndex = boards.value.findIndex(board => board.id === boardId);
    boards.value.splice(boardIndex, 1);
    deleteBoardFromLocalStorage(boardId);
  }
  const boardAmount = computed(()=> boards.value.length)

  
  return {boards, boardAmount, createBoard, editBoard, deleteBoard}
})
