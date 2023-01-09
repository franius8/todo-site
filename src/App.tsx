import React, {useEffect} from "react";
import RouteSwitch from "./RouteSwitch";
import NewToDoForm from "./NewToDoForm";
import NewProjectForm from "./NewProjectForm";
import {useDispatch, useSelector} from 'react-redux'
import {ProjectInterface, ToDoInterface} from "./Modules/d";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "./Modules/firebase";
import {collection, doc, onSnapshot, updateDoc} from "firebase/firestore";
import idGenerator from "./Modules/idGenerator";
import todoObject from "./Modules/todoObject";
import {addToDo, setProjects, setToDos} from "./Redux/contentSlice";
import {openModal} from "./Redux/modalSlice";
import Projectobject from "./Modules/projectobject";
import InfoErrorModal from "./InfoErrorModal";
import database from "./Modules/database";
import ProjectToDoForm from "./ProjectToDoForm";

export default function App() {
    const dispatch = useDispatch();
    const toDos = useSelector((state: any) => state.content.toDos);

    const projectFormVisible = useSelector((state: { modal: { projectFormVisible: boolean } }) => state.modal.projectFormVisible);
    const contentClass = useSelector((state: any) => state.modal.contentClass);

    let unsubscribe = () => {};


    useEffect(() => {
        let rawToDoAry: string[] = [];
        let rawDoneToDoAry: string[] = [];
        let rawProjectAry: string[] = [];
        let unsubscribe = () => {};
        //Does not return a promise, dispatch code temporarily doubled
        onAuthStateChanged(auth, (user) => {
            if (user) {
                unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
                    rawToDoAry = JSON.parse(doc.data()?.todos || "[]");
                    rawDoneToDoAry = JSON.parse(doc.data()?.donetodos || "[]");
                    rawProjectAry = JSON.parse(doc.data()?.projects || "[]");
                    dispatch(setToDos(convertRawToDos(rawToDoAry)));
                    dispatch(setProjects(convertRawProjects(rawProjectAry)));
                });
            } else {
                console.log("No user is currently signed in. ToDos are saved in local storage.");
                rawToDoAry = JSON.parse(localStorage.getItem("todoary") || "[]");
                rawDoneToDoAry = JSON.parse(localStorage.getItem("doneary") || "[]");
                rawProjectAry = JSON.parse(localStorage.getItem("projectary") || "[]");
                dispatch(setToDos(convertRawToDos(rawToDoAry)));
                dispatch(setProjects(convertRawProjects(rawProjectAry)));
            }
        });
        return () => unsubscribe();
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

    const createToDo = (heading: string, text: string, date: string, priority: string) => {
        const toDosCopy = [...toDos];
        const iD = idGenerator.generateID();
        const newToDo:ToDoInterface = todoObject(heading, text, date, priority, iD, []);
        toDosCopy.push(newToDo);
        dispatch(addToDo(newToDo));
        database.updateDatabase(toDosCopy, "todos");
    }

    return (
        <div id={"content"} className={contentClass}>
            <RouteSwitch />
            <NewToDoForm />
            <NewProjectForm />
            <ProjectToDoForm />
            <InfoErrorModal />
        </div>
    )
}