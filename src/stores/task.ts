import { defineStore } from "pinia";
import {ref} from "vue"
import type { ITask, TaskStatus } from "@/types/task";
import type { IBoard } from "@/types/board";
import { useBoardStore } from "./board";
import { 
    addTaskToBoardInStorage, 
    editTaskInBoardInLocalStorage,
    deleteTaskFromBoardInLocalStorage,
    changeTaskStatusInBoardInLocalStorage,
    toggleSubtaskInBoardInLocalStorage
} from "@/utils/boardStorage";
import {
    getTasksFromLocalStorage,
    addTaskToLocalStroage,
    editTaskInLocalStorage,
    deleteTaskFromLocalStorage,
    changeTaskStatusInLocalStorage,
    toggleSubtaskInLocalStorage
} from "@/utils/taskStorage";
import {v4 as uuidv4} from "uuid"

export const useTaskStore = defineStore("task", ()=>{
    const tasks = ref<ITask[]>(getTasksFromLocalStorage());
    const boards = useBoardStore()

    const createTask = (task: ITask, boardId: string)=>{
        const board = boards.boards.find(board => board.id === boardId)!;
        tasks.value.push({...task, id: uuidv4(), boardId});
        board.tasks.push(tasks.value[tasks.value.length - 1]);
        addTaskToLocalStroage(tasks.value[tasks.value.length - 1]);
        addTaskToBoardInStorage(boardId, board.tasks[board.tasks.length - 1]);
    }
    const editTask = (editedTask: ITask, boardId: string)=>{
        const board = boards.boards.find(board => board.id === boardId)!;
        tasks.value = tasks.value.map(task => task.id === editedTask.id ? editedTask : task)
        board.tasks = board.tasks.map(task => task.id === editedTask.id ? editedTask : task)
        editTaskInLocalStorage(editedTask);
        editTaskInBoardInLocalStorage(boardId, editedTask);
    }
    const deleteTask = (taskId: string, boardId: string)=>{
        const board = boards.boards.find(board => board.id === boardId)!;
        tasks.value = tasks.value.filter(task => task.id !== taskId)
        board.tasks = board.tasks.filter(task => task.id !== taskId)
        deleteTaskFromLocalStorage(taskId);
        deleteTaskFromBoardInLocalStorage(boardId, taskId);
    }
    const changeTaskStatus = (taskId: string, status: TaskStatus, boardId: string)=>{
        const board = boards.boards.find(board => board.id === boardId)!;
        tasks.value = tasks.value.map(task => task.id === taskId ? {...task, status} : task)
        board.tasks = board.tasks.map(task => task.id === taskId ? {...task, status} : task);
        changeTaskStatusInLocalStorage(taskId, status);
        changeTaskStatusInBoardInLocalStorage(boardId, taskId, status);
    }
    const toggleSubtask = (subtaskId: string, taskId: string, boardId: string)=>{
        const board = boards.boards.find(board => board.id === boardId)!;
        tasks.value = tasks.value.map(task => task.id !== taskId ? task : ({...task, subtasks: task.subtasks.map(subtask => subtask.id === subtaskId ? {...subtask, completed: !subtask.completed} : subtask)}))
        board.tasks = board.tasks.map(task => task.id !== taskId ? task : ({...task, subtasks: task.subtasks.map(subtask => subtask.id === subtaskId ? {...subtask, completed: !subtask.completed} : subtask)}))
        toggleSubtaskInLocalStorage(subtaskId, taskId);
        toggleSubtaskInBoardInLocalStorage(boardId, taskId, subtaskId);
    }

    return {tasks, createTask, editTask, deleteTask, changeTaskStatus, toggleSubtask}
})