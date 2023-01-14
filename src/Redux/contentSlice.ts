import { createSlice} from "@reduxjs/toolkit";
import { ToDoInterface, ProjectInterface } from "../Modules/d";
import database from "../Modules/database";

interface ContentState {
    toDos: ToDoInterface[];
    projectList: ProjectInterface[];
    doneList: ToDoInterface[];
    doneProjectList: ProjectInterface[];
}

const initialState: ContentState = {
    toDos: [],
    projectList: [],
    doneList: [],
    doneProjectList: [],
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
        addDoneProject: (state, action: { payload: ProjectInterface}) => {
            state.doneProjectList = [...state.doneProjectList, action.payload];
            database.updateDatabase(state.doneProjectList, 'doneprojects');
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
        },
        setDoneProjects: (state, action: { payload: ProjectInterface[]}) => {
            state.doneProjectList = action.payload;
            database.updateDatabase(state.doneProjectList, 'doneprojects');
        },
        loadInitialState: (state, action: {payload: {toDos: ToDoInterface[], doneToDos: ToDoInterface[],
            projects: ProjectInterface[], doneProjects: ProjectInterface[]}}) => {
            console.log(action.payload)
            state.toDos = action.payload.toDos
            state.doneList = action.payload.doneToDos
            state.projectList = action.payload.projects
            state.doneProjectList = action.payload.doneProjects
}
    }
})

export const {
    addToDo,
    addProject,
    addDone,
    addDoneProject,
    setProjects,
    setToDos,
    setDoneList,
    setDoneProjects,
    loadInitialState
} = contentSlice.actions;

export default contentSlice.reducer;