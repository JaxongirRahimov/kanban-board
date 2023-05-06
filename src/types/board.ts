import type {ITask} from "./task"

export interface IBoard {
    id: string;
    boardName: string;
    tasks: ITask[];
}