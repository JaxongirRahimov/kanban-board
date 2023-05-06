import type { ITask, TaskStatus } from "@/types/task";


const persistTasksInLocalStorage = (tasks: ITask[])=>{
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const getTasksFromLocalStorage = ()=>{
    return JSON.parse(localStorage.getItem("tasks") || "[]")
}
const addTaskToLocalStroage = (task: ITask)=>{
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    persistTasksInLocalStorage(tasks);
}
const editTaskInLocalStorage = (editedTask: ITask)=>{
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.map((task: ITask) => task.id === editedTask.id ? editedTask : task);
    persistTasksInLocalStorage(tasks);
}
const deleteTaskFromLocalStorage = (taskId: string)=>{
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter((task: ITask) => task.id !== taskId);
    persistTasksInLocalStorage(tasks);
}
const changeTaskStatusInLocalStorage = (taskId: string, status: TaskStatus)=>{
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.map((task: ITask) => task.id === taskId ? {...task, status} : task);
    persistTasksInLocalStorage(tasks);
}
const toggleSubtaskInLocalStorage = (subtaskId: string, taskId: string)=>{
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.map((task: ITask) => {
        if(task.id === taskId){
            task = {...task, subtasks: task.subtasks.map(subtask => subtask.id === subtaskId ? {...subtask, completed: !subtask.completed} : subtask)}
            return task;
        } else {
            return task;
        }
    });
    persistTasksInLocalStorage(tasks);
}

export {
    getTasksFromLocalStorage,
    addTaskToLocalStroage,
    editTaskInLocalStorage,
    deleteTaskFromLocalStorage,
    changeTaskStatusInLocalStorage,
    toggleSubtaskInLocalStorage
}