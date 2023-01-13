import React, {useEffect} from "react";
import RouteSwitch from "./RouteSwitch";
import NewToDoForm from "./NewToDoForm";
import NewProjectForm from "./NewProjectForm";
import {useDispatch, useSelector} from 'react-redux'
import {ProjectInterface, ToDoInterface} from "./Modules/d";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "./Modules/firebase";
import {doc, onSnapshot} from "firebase/firestore";
import todoObject from "./Modules/todoObject";
import {loadInitialState, setDoneList, setDoneProjects, setProjects, setToDos} from "./Redux/contentSlice";
import Projectobject from "./Modules/projectobject";
import InfoErrorModal from "./Modals/InfoErrorModal";

export default function App() {
    const dispatch = useDispatch();
    const contentClass = useSelector((state: any) => state.modal.contentClass);

    useEffect(() => {
        console.log("fetched")
        let rawToDoAry: string[] = [];
        let rawDoneToDoAry: string[] = [];
        let rawProjectAry: string[] = [];
        let rawDoneProjectAry: string[] = [];
        let unsubscribe = () => {};
        //Does not return a promise, dispatch code temporarily doubled
        onAuthStateChanged(auth, (user) => {
            if (user) {
                unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
                    rawToDoAry = JSON.parse(doc.data()?.todos || "[]");
                    rawDoneToDoAry = JSON.parse(doc.data()?.donetodos || "[]");
                    rawProjectAry = JSON.parse(doc.data()?.projects || "[]");
                    rawDoneProjectAry = JSON.parse(doc.data()?.doneprojects || "[]")
                    dispatch(loadInitialState({ toDos: convertRawToDos(rawToDoAry), doneToDos: convertRawToDos(rawToDoAry),
                    projects: convertRawProjects(rawProjectAry), doneProjects: convertRawProjects(rawProjectAry)}))
                });
            } else {
                console.log("No user is currently signed in. ToDos are saved in local storage.");
                rawToDoAry = JSON.parse(localStorage.getItem("todoary") || "[]");
                rawDoneToDoAry = JSON.parse(localStorage.getItem("doneary") || "[]");
                rawProjectAry = JSON.parse(localStorage.getItem("projectary") || "[]");
                dispatch(loadInitialState({ toDos: convertRawToDos(rawToDoAry), doneToDos: convertRawToDos(rawToDoAry),
                    projects: convertRawProjects(rawProjectAry), doneProjects: convertRawProjects(rawProjectAry)}))
            }
        });
        unsubscribe()
    }, []);

    const convertRawToDos = (rawToDoAry: any[]) => {
        const toDoAry: ToDoInterface[] = [];
        rawToDoAry.forEach((todo: ToDoInterface) => {
            toDoAry.push(todoObject(todo.heading, todo.text, todo.date, todo.priority, todo.iD, todo.projectiDs));
        });
        return toDoAry;
    }

    const convertRawProjects = (rawProjectAry: any[]) => {
        const projectAry: ProjectInterface[] = [];
        rawProjectAry.forEach((project: ProjectInterface) => {
            project.toDosAry = convertRawToDos(project.toDosAry);
            projectAry.push(Projectobject(project.iD, project.name, project.toDosAry, project.date, project.priority));
        });
        return projectAry;
    }

    return (
        <div id={"content"} className={contentClass}>
            <RouteSwitch />
            <NewToDoForm />
            <NewProjectForm />
            <InfoErrorModal />
        </div>
    )
}