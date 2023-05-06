<script setup lang="ts">
import {Form, Field, ErrorMessage, FieldArray} from "vee-validate";
import {v4 as uuidv4} from "uuid";
import {taskSchema} from "@/validations/task";
import type {IThemeMode} from "@/types/theme-mode";
import { useTaskStore } from "@/stores/task";
import {inject} from "vue";

const props = defineProps(["activeBoard", "activeTask", "updateActiveBoard", "isEditTaskModelOpen", "toggleEditTaskModel"])

const initialData = {
    title: props.activeTask.title,
    description: props.activeTask.description,
    status: props.activeTask.status,
    subtasks: [...props.activeTask.subtasks]
}

 
const task = useTaskStore()

const handleEditTaskSubmit = (values: any, handleReset: any)=>{
    task.editTask({...values, subtasks: !values.subtasks ? [] : values.subtasks, id: props.activeTask.id}, props.activeBoard.id);
    props.toggleEditTaskModel();
    handleReset.resetForm()
}

const {isDarkMode} = inject("theme-mode") as IThemeMode;

</script>
<template>
    <div class="model-wrapper" :class="[isEditTaskModelOpen ? 'active' : '', !isDarkMode ? 'model-wrapper__light-mode' : '']">
        <div class="model">
            <button @click="toggleEditTaskModel" class="model__cancel-btn"><v-icon name="io-close-outline"/></button>
            <header class="model__header">
                <h3 class="model__title">
                    Edit Task
                </h3>
            </header>
            <Form
            :initial-values="initialData"
            :validation-schema="taskSchema"
            @submit="handleEditTaskSubmit"
            class="edit-task-form"
            >
            <div class="edit-task-form__control">
                <label for="title" class="edit-task-form__label">Title</label>
                <Field class="edit-task-form__input" id="title" name="title" placeholder="e.g. Take coffe break"/>
                <ErrorMessage name="title" class="edit-task-form__error-message"/>
            </div>
            <div class="edit-task-form__control">
                <label for="description" class="edit-task-form__label">Description</label>
                <Field class="edit-task-form__input edit-task-form__textarea" name="description" id="description" as="textarea" placeholder="e.g. It's always good to take a break. This 15 minutes break will recharge the batteries a little"/>
                <ErrorMessage name="description" class="edit-task-form__error-message"/>
            </div>
            <FieldArray name="subtasks" v-slot="{fields, remove, push}">
                <p class="edit-task-form__label">Subtasks</p>
                <div v-for="(field, idx) in fields" :key="idx">
                    <div class="edit-task-form__subtask-box">
                        <Field class="edit-task-form__input" :name="`subtasks[${idx}].subtask`" placeholder="Add subtask..."/>
                        <button type="button" @click="remove(idx)" class="edit-task-form__delete-subtask-btn"><v-icon name="io-close-circle-outline"/></button>
                    </div>
                    <ErrorMessage :name="`subtasks[${idx}].subtask`" class="edit-task-form__error-message"/>
                </div>
                <button type="button" @click="push({id: uuidv4(), subtask: '', completed: false})" class="edit-task-form__add-subtask-btn"><v-icon name="co-plus"/> Add New Task</button>
            </FieldArray>
            <div class="edit-task-form__control">
                <label for="status" class="edit-task-form__label">Status</label>
                <Field class="edit-task-form__input edit-task-form__select" name="status" id="status" as="select">
                    <option value="TODO">Todo</option>
                    <option value="DOING">Doing</option>
                    <option value="DONE">Done</option>
                </Field>
                <ErrorMessage name="status" class="edit-task-form__error-message"/>
            </div>
            <button type="submit" class="edit-task-form__edit-task-btn">Edit Task</button>
            </Form>
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
    background: rgba(0,0,0,.7);
    z-index: 9;
    display: none;
}
.model-wrapper__light-mode .model {
    background: #fff;
}
.model-wrapper__light-mode .model__title {
    color: #333;
}
.model-wrapper__light-mode .edit-task-form__input {
    background: #eee;
    color: #333;
}
.model-wrapper__light-mode .edit-task-form__label {
    color: #555;
}
.model-wrapper__light-mode .edit-task-form__select {
    color: #333;
}
.model-wrapper.active {
    display: flex;
}
.model {
    position: relative;
    width: 90%;
    max-width: 550px;
    margin: 50px 0;
    padding: 25px;
    height: 95vh;
    margin: 100px 0;
    overflow-y: scroll;
    border-radius: 5px;
    background: hsl(240, 12%, 25%);
}
.model::-webkit-scrollbar {
    width: .5rem;
}
.model::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
 
.model::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
 
.model__header {
    margin-bottom: 25px;
    border-bottom: 1px solid #5a5a5a;
}
.model__title {
    font-size: clamp(1.2rem, calc(1vw + 1rem), 1.5rem);
}
.model__cancel-btn {
    display: block;
    margin-left: auto;
    position: sticky;
    top: 0;
    background: rgba(255, 255, 255, .4);
    border: 2px solid rgba(0,0,0,.1);
}
.model__cancel-btn * {
    color: #fff;
}

.edit-task-form__control {
    margin-bottom: 25px;
}
.edit-task-form__label {
    display: block;
    padding-bottom: 5px;
}
.edit-task-form__input {
    display: block;
    width: 100%;
    padding: 15px 5px;
    background: transparent;
    border: 1px solid #5c5c5c;
    border-radius: 5px;
    background: hsl(240, 12%, 23%);
    color: #fff;
}
.edit-task-form__textarea {
    resize: none;
    height: 150px;
}
.edit-task-form__subtask-box {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
}
.edit-task-form__add-subtask-btn {
    display: block;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 25px;
    padding: 10px 0;
    border-radius: 25px;
    color: hsl(242, 47%, 57%);
    font-weight: 500;
}
.edit-task-form__delete-subtask-btn {
    background: transparent;
    color: #fff;
}
.edit-task-form__edit-task-btn {
    display: block;
    width: 100%;
    background: hsl(24, 91%, 53%);
    padding: 15px 0;
    color: #fff;
    border-radius: 25px;
    font-weight: 500;
}
.edit-task-form__error-message {
    color: rgb(247, 34, 34);
    font-size: 15px;
}
</style>