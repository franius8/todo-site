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

const sortByDate = (array: ToDoInterface[] | ProjectInterface[]) => {
       return [...array].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        addToDo: (state, action: { payload: ToDoInterface}) => {
            state.toDos = sortByDate([...state.toDos, action.payload]) as ToDoInterface[];
            database.updateDatabase(state.toDos, 'todos');
        },
        addProject: (state, action: { payload: ProjectInterface}) => {
            state.projectList = sortByDate([...state.projectList, action.payload]) as ProjectInterface[];
            database.updateDatabase(state.projectList, 'projects');
        },
        addDone: (state, action: { payload: ToDoInterface}) => {
            state.doneList = sortByDate([...state.doneList, action.payload]).reverse() as ToDoInterface[];
            database.updateDatabase(state.doneList, 'donetodos');
        },
        addDoneProject: (state, action: { payload: ProjectInterface}) => {
            state.doneProjectList = sortByDate([...state.doneProjectList, action.payload]).reverse() as ProjectInterface[];
            database.updateDatabase(state.doneProjectList, 'doneprojects');
        },
        setToDos: (state, action: { payload: ToDoInterface[]}) => {
            state.toDos = sortByDate(action.payload) as ToDoInterface[];
            database.updateDatabase(state.toDos, 'todos');
        },
        setProjects: (state, action: { payload: ProjectInterface[]}) => {
            state.projectList = sortByDate(action.payload) as ProjectInterface[];
            database.updateDatabase(state.projectList, 'projects');
        },
        setDoneList: (state, action: { payload: ToDoInterface[]}) => {
            state.doneList = sortByDate(action.payload).reverse() as ToDoInterface[];
            database.updateDatabase(state.doneList, 'donetodos');
        },
        setDoneProjects: (state, action: { payload: ProjectInterface[]}) => {
            state.doneProjectList = sortByDate(action.payload).reverse() as ProjectInterface[];
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