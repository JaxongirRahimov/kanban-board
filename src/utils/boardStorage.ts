import type { IBoard } from "@/types/board"
import type { ITask, TaskStatus } from "@/types/task"

const persitBoardInLocalStorage = (boards: IBoard[])=>{
    localStorage.setItem("boards", JSON.stringify(boards))
}

const getBoardsFromLocalStorage = ()=>{
    return JSON.parse(localStorage.getItem("boards") || "[]")
}
const addBoardToLocalStorage = (board: IBoard)=>{
    const boards = getBoardsFromLocalStorage();
    boards.push(board);
    persitBoardInLocalStorage(boards);
}
const editBoardInLocalStorage = (editedBoard: IBoard)=>{
    let boards = getBoardsFromLocalStorage();
    boards = boards.map((board: IBoard) => board.id === editedBoard.id ? editedBoard : board);
    persitBoardInLocalStorage(boards);
}
const deleteBoardFromLocalStorage = (boardId: string)=>{
    let boards = getBoardsFromLocalStorage();
    boards = boards.filter((board: IBoard) => board.id !== boardId);
    persitBoardInLocalStorage(boards);
}
const addTaskToBoardInStorage = (boardId: string, task: ITask)=>{
    let boards = getBoardsFromLocalStorage();
    boards = boards.map((board: IBoard) => {
        if(board.id === boardId) {
            board.tasks.push(task);
            return board;
        } else {
            return board;
        }
    })
    persitBoardInLocalStorage(boards);
}
const editTaskInBoardInLocalStorage = (boardId: string, editedTask: ITask)=>{
    let boards = getBoardsFromLocalStorage();
    boards = boards.map((board: IBoard) => {
        if(board.id === boardId) {
            board = {...board, tasks: board.tasks.map(task => task.id === editedTask.id ? editedTask : task)}
            return board;
        } else {
            return board;
        }
    })
    persitBoardInLocalStorage(boards);
}
const deleteTaskFromBoardInLocalStorage = (boardId: string, taskId: string)=>{
    let boards = getBoardsFromLocalStorage();
    boards = boards.map((board: IBoard) => {
        if(board.id === boardId){
            board = {...board, tasks: board.tasks.filter(task => task.id !== taskId)}
            return board;
        } else {
            return board;
        }
    });
    persitBoardInLocalStorage(boards);
}
const changeTaskStatusInBoardInLocalStorage = (boardId: string, taskId: string, status: TaskStatus)=>{
    let boards = getBoardsFromLocalStorage();
    boards = boards.map((board: IBoard) => {
        if(board.id === boardId){
            board = {...board, tasks: board.tasks.map(task => task.id === taskId ? {...task, status} : task)}
            return board;
        } else {
            return board;
        }
    })
    persitBoardInLocalStorage(boards);
}
const toggleSubtaskInBoardInLocalStorage = (boardId: string, taskId: string, subtaskId: string, )=>{
    let boards = getBoardsFromLocalStorage();
    boards = boards.map((board: IBoard)=> {
        if(board?.id === boardId) {
            board = {...board, tasks: board.tasks.map(task => {
                if(task?.id === taskId){
                    task = {...task, subtasks: task.subtasks.map(subtask => {
                        if(subtask?.id === subtaskId){
                            console.log("Subtask Match")
                            subtask = {...subtask, completed: !subtask.completed};
                            return subtask;
                        } else {
                            return subtask;
                        }
                    })}
                    return task
                } else {
                    return task;
                }
            })};
            return board
        } else {
            return board;
        }
    })
    persitBoardInLocalStorage(boards);
}

export {
    persitBoardInLocalStorage,
    getBoardsFromLocalStorage,
    addBoardToLocalStorage,
    editBoardInLocalStorage,
    deleteBoardFromLocalStorage,
    addTaskToBoardInStorage,
    editTaskInBoardInLocalStorage,
    deleteTaskFromBoardInLocalStorage,
    changeTaskStatusInBoardInLocalStorage,
    toggleSubtaskInBoardInLocalStorage
}
