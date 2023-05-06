<script setup lang="ts">
import {Form, Field, ErrorMessage, FieldArray} from "vee-validate";
import {v4 as uuidv4} from "uuid";
import {taskSchema} from "@/validations/task";
import type {IThemeMode} from "@/types/theme-mode";
import { useTaskStore } from "@/stores/task";
import {inject} from "vue";

const props = defineProps(["activeBoard", "toggleAddTaskModel", "isAddTaskModelOpen"])

const initialData = {
    title: "",
    description: "",
    status: "",
    subtasks: [{id: uuidv4(), subtask: "", completed: false}]
}

const task = useTaskStore()

const handleAddTaskSubmit = (values: any, handleReset: any)=>{
    console.log("Add task", values)
    task.createTask({...values, subtasks: !values.subtasks ? [] : values.subtasks}, props.activeBoard.id);
    props.toggleAddTaskModel();
    handleReset.resetForm()
}

const {isDarkMode} = inject("theme-mode") as IThemeMode;

</script>
<template>
    <div class="model-wrapper" :class="[isAddTaskModelOpen ? 'active' : '', !isDarkMode ? 'model-wrapper__light-mode' : '']">
        <div class="model">
            <button @click="toggleAddTaskModel" class="model__cancel-btn"><v-icon name="io-close-outline"/></button>
            <header class="model__header">
                <h3 class="model__title">
                    Add New Task
                </h3>
            </header>
            <Form
            :initial-values="initialData"
            :validation-schema="taskSchema"
            @submit="handleAddTaskSubmit"
            class="add-task-form"
            >
            <div class="add-task-form__control">
                <label for="title" class="add-task-form__label">Title</label>
                <Field class="add-task-form__input" id="title" name="title" placeholder="e.g. Take coffe break"/>
                <ErrorMessage name="title" class="add-task-form__error-message"/>
            </div>
            <div class="add-task-form__control">
                <label for="description" class="add-task-form__label">Description</label>
                <Field class="add-task-form__input add-task-form__textarea" name="description" id="description" as="textarea" placeholder="e.g. It's always good to take a break. This 15 minutes break will recharge the batteries a little"/>
                <ErrorMessage name="description" class="add-task-form__error-message"/>
            </div>
            <FieldArray name="subtasks" v-slot="{fields, remove, push}">
                <p class="add-task-form__label">Subtasks</p>
                <div v-for="(field, idx) in fields" :key="idx">
                    <div class="add-task-form__subtask-box">
                        <Field class="add-task-form__input" :name="`subtasks[${idx}].subtask`" placeholder="Add subtask..."/>
                        <button type="button" @click="remove(idx)" class="add-task-form__delete-subtask-btn"><v-icon name="io-close-circle-outline"/></button>
                    </div>
                    <ErrorMessage :name="`subtasks[${idx}].subtask`" class="add-task-form__error-message"/>
                </div>
                <button type="button" @click="push({id: uuidv4(), subtask: '', completed: false})" class="add-task-form__add-subtask-btn"><v-icon name="co-plus"/> Add New Task</button>
            </FieldArray>
            <div class="add-task-form__control">
                <label for="status" class="add-task-form__label">Status</label>
                <Field class="add-task-form__input add-task-form__select" name="status" id="status" as="select">
                    <option value="TODO">Todo</option>
                    <option value="DOING">Doing</option>
                    <option value="DONE">Done</option>
                </Field>
                <ErrorMessage name="status" class="add-task-form__error-message"/>
            </div>
            <button type="submit" class="add-task-form__add-task-btn">Create Task</button>
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
.model-wrapper__light-mode .add-task-form__label {
    color: #555;
}
.model-wrapper__light-mode .add-task-form__input {
    background: #eee;
    color: #333;
}
.model-wrapper__light-mode .add-task-form__select {
    color: #333;
}
.model-wrapper.active {
    display: flex;
}
.model {
    position: relative;
    max-width: 550px;
    width: 90%;
    height: 95vh;
    overflow-y: scroll;
    margin: 25px 0;
    padding: 25px;
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
    right: 15px;
    background: rgba(255, 255, 255, 1);
    border: 2px solid rgba(0,0,0,.1);
    z-index: 9999;
}
.model__cancel-btn * {
    color: #fff;
}

.add-task-form__control {
    margin-bottom: 25px;
}
.add-task-form__label {
    display: block;
    padding-bottom: 5px;
}
.add-task-form__input {
    display: block;
    width: 100%;
    padding: 15px 5px;
    background: transparent;
    border: 1px solid #5c5c5c;
    border-radius: 5px;
    background: hsl(240, 12%, 23%);
    color: #fff;
}
.add-task-form__textarea {
    resize: none;
    height: 150px;
}
.add-task-form__subtask-box {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;
}
.add-task-form__add-subtask-btn {
    display: block;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 25px;
    padding: 10px 0;
    border-radius: 25px;
    color: hsl(242, 47%, 57%);
    font-weight: 500;
}
.add-task-form__delete-subtask-btn {
    background: transparent;
    color: #fff;
}
.add-task-form__add-task-btn {
    display: block;
    width: 100%;
    background: hsl(242, 47%, 57%);
    padding: 15px 0;
    color: #fff;
    border-radius: 25px;
    font-weight: 500;
}
.add-task-form__error-message {
    color: rgb(247, 34, 34);
    font-size: 15px;
}
</style>