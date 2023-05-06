export interface ISubTask {
    id: string;
    subtask: string;
    completed: boolean;
}
export enum TaskStatus {
    TODO,
    DOING,
    DONE
}
export interface IFormTaskData {
    title: string;
    description: string;
    status: TaskStatus;
    subtasks: ISubTask[];
}
export interface ITask extends IFormTaskData {
    id?: string;
    boardId: string;
}
