import { createSlice} from "@reduxjs/toolkit";
import {ToDoInterface, ProjectInterface} from "../Modules/d";
import database from "../Modules/database";

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
            state.toDos = [...state.toDos, action.payload];
            database.updateDatabase(state.toDos, 'todos');
        },
        addProject: (state, action: { payload: ProjectInterface}) => {
            state.projectList = [...state.projectList, action.payload];
            database.updateDatabase(state.projectList, 'projects');
        },
        addDone: (state, action: { payload: ToDoInterface}) => {
            state.doneList = [...state.doneList, action.payload];
            database.updateDatabase(state.doneList, 'donetodos');
        },
        setToDos: (state, action: { payload: ToDoInterface[]}) => {
            state.toDos = action.payload;
            database.updateDatabase(state.toDos, 'todos');
        },
        setProjects: (state, action: { payload: ProjectInterface[]}) => {
            state.projectList = action.payload;
            database.updateDatabase(state.projectList, 'projects');
        },
        setDoneList: (state, action: { payload: ToDoInterface[]}) => {
            state.doneList = action.payload;
            database.updateDatabase(state.doneList, 'donetodos');
        }
    }
})

export const { addToDo, addProject, setProjects, setToDos, setDoneList, addDone } = contentSlice.actions;

export default contentSlice.reducer;