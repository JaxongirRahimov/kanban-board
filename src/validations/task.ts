import {object, string, boolean, array} from "yup";

export const taskSchema = object({
    title:
        string()
        .min(5, "Minimum title length is 5")
        .max(100, "Maximum title length is 100")
        .required("Task title must be provided!"),
    description:
        string()
        .min(20, "Minimum description length is 20")
        .max(500, "Maximum description length is 500")
        .required("Task description must be provided!"),
    status:
        string()
        .matches(/todo|doing|done/i, "You must choose task status")
        .required("Task status must be provided!"),
    subtasks:
        array().of(object({
            id: string(),
            subtask: string(),
            completed: boolean(),
        }))
})