import { createSlice} from "@reduxjs/toolkit";
import {ToDoInterface, ProjectInterface} from "../Modules/d";

interface ContentState {
    toDos: ToDoInterface[];
    projectList: ProjectInterface[];
    doneList: ToDoInterface[];
}

const initialState: ContentState = {
    toDos: [],
    projectList: [],
    doneList: [],
}

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        addToDo: (state, action: { payload: ToDoInterface}) => {
            state.toDos.push(action.payload);
        },
        addProject: (state, action: { payload: ProjectInterface}) => {
            state.projectList.push(action.payload);
        },
        setToDos: (state, action: { payload: ToDoInterface[]}) => {
            state.toDos = action.payload;
        },
        setProjects: (state, action: { payload: ProjectInterface[]}) => {
            state.projectList = action.payload;
        },
        setDoneList: (state, action: { payload: ToDoInterface[]}) => {
            state.doneList = action.payload;
        }
    }
})

export const { addToDo, addProject, setProjects, setToDos, setDoneList } = contentSlice.actions;

export default contentSlice.reducer;