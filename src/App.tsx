import React, {useEffect} from "react";
import RouteSwitch from "./RouteSwitch";
import NewToDoForm from "./NewToDoForm";
import NewProjectForm from "./NewProjectForm";
import {useDispatch, useSelector} from 'react-redux'
import {ProjectInterface, ToDoInterface, StateInterface} from "./Modules/d";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "./Modules/firebase";
import {doc, onSnapshot} from "firebase/firestore";
import todoObject from "./Modules/todoObject";
import {loadInitialState} from "./Redux/contentSlice";
import Projectobject from "./Modules/projectobject";
import InfoErrorModal from "./Modals/InfoErrorModal";


// Component containing the route switch and global modals
export default function App() {
    const dispatch = useDispatch();
    const contentClass = useSelector((state: StateInterface) => state.modal.contentClass);

    useEffect(() => {
        
        let rawToDoAry: ToDoInterface[] = [];
        let rawDoneToDoAry: ToDoInterface[] = [];
        let rawProjectAry: ProjectInterface[] = [];
        let rawDoneProjectAry: ProjectInterface[] = [];
        let unsubscribe = () => {};

        const convertRawToDos = (rawToDoAry: ToDoInterface[]) => {
            const toDoAry: ToDoInterface[] = [];
            rawToDoAry.forEach((todo: ToDoInterface) => {
                toDoAry.push(todoObject(todo.heading, todo.text, todo.date, todo.priority, todo.iD, todo.projectiDs));
            });
            return toDoAry;
        }

        const convertRawProjects = (rawProjectAry: ProjectInterface[]) => {
            const projectAry: ProjectInterface[] = [];
            rawProjectAry.forEach((project: ProjectInterface) => {
                project.toDosAry = convertRawToDos(project.toDosAry);
                projectAry.push(Projectobject(project.iD, project.name, project.toDosAry, project.date, project.priority));
            });
            return projectAry;
        }
        //Does not return a promise, dispatch code temporarily doubled
        onAuthStateChanged(auth, (user) => {
            if (user) {
                unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
                    rawToDoAry = JSON.parse(doc.data()?.todos || "[]");
                    rawDoneToDoAry = JSON.parse(doc.data()?.donetodos || "[]");
                    rawProjectAry = JSON.parse(doc.data()?.projects || "[]");
                    rawDoneProjectAry = JSON.parse(doc.data()?.doneprojects || "[]");
                    
                    dispatch(loadInitialState({ toDos: convertRawToDos(rawToDoAry), doneToDos: convertRawToDos(rawDoneToDoAry),
                    projects: convertRawProjects(rawProjectAry), doneProjects: convertRawProjects(rawDoneProjectAry)}))
                });
            } else {
                
                rawToDoAry = JSON.parse(localStorage.getItem("todoary") || "[]");
                rawDoneToDoAry = JSON.parse(localStorage.getItem("doneary") || "[]");
                rawProjectAry = JSON.parse(localStorage.getItem("projectary") || "[]");
                dispatch(loadInitialState({ toDos: convertRawToDos(rawToDoAry), doneToDos: convertRawToDos(rawToDoAry),
                    projects: convertRawProjects(rawProjectAry), doneProjects: convertRawProjects(rawProjectAry)}))
            }
        });
        unsubscribe()
    }, []);

    return (
        <div id={"content"} className={contentClass}>
            <RouteSwitch />
            <NewToDoForm />
            <NewProjectForm />
            <InfoErrorModal />
        </div>
    )
}