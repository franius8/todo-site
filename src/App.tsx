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
import dateFixer from "./Modules/datefixer";
import Projectobject from "./Modules/projectobject";

export default function App() {
    const dispatch = useDispatch();
    const toDos = useSelector((state: any) => state.content.toDos);

    const projectFormVisible = useSelector((state: { modal: { projectFormVisible: boolean } }) => state.modal.projectFormVisible);
    const contentClass = useSelector((state: any) => state.modal.contentClass);

    useEffect(() => {
        let rawToDoAry: string[] = [];
        let rawDoneToDoAry: string[] = [];
        let rawProjectAry: string[] = [];
        let unsubscribe = () => {};
        onAuthStateChanged(auth,  async (user) => {
            if (user) {
                unsubscribe = onSnapshot(doc(db, "users", user.uid), (doc) => {
                    rawToDoAry = JSON.parse(doc.data()?.todos || "[]");
                    rawDoneToDoAry = JSON.parse(doc.data()?.donetodos || "[]");
                    rawProjectAry = JSON.parse(doc.data()?.projects || "[]");
                });
            } else {
                console.log("No user is currently signed in. ToDos are saved in local storage.");
                rawToDoAry = JSON.parse(localStorage.getItem("todoary") || "[]");
                rawDoneToDoAry = JSON.parse(localStorage.getItem("doneary") || "[]");
                rawProjectAry = JSON.parse(localStorage.getItem("projectary") || "[]")
            }
            dispatch(setToDos(convertRawToDos(rawToDoAry)));
            dispatch(setProjects(convertRawProjects(rawProjectAry)));
            dispatch(setToDos(convertRawToDos(rawDoneToDoAry)));
        });
        return () => unsubscribe();
    }, []);

    const convertRawToDos = (rawToDoAry: any[]) => {
        const toDoAry: ToDoInterface[] = [];
        rawToDoAry.forEach((todo: ToDoInterface) => {
            todo.date = dateFixer.fixDates(todo.date);
            toDoAry.push(todoObject(todo.heading, todo.text, todo.date, todo.priority, todo.iD, todo.projectiDs));
        });
        return toDoAry;
    }

    const convertRawProjects = (rawProjectAry: any[]) => {
        const projectAry: ProjectInterface[] = [];
        rawProjectAry.forEach((project: ProjectInterface) => {
            project.date = dateFixer.fixDates(project.date);
            project.toDosAry = convertRawToDos(project.toDosAry);
            projectAry.push(Projectobject(project.iD, project.name, project.toDosAry, project.date, project.priority));
        });
        return projectAry;
    }

    const updateDatabase = async (toDosCopy: ToDoInterface[] | ProjectInterface[], type: string) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                try {
                    const docRef = await updateDoc(doc(collection(db, "users"), uid), {
                        [type]: JSON.stringify(toDosCopy)
                    });
                } catch (e) {
                }
            } else {
                let itemName;
                switch (type) {
                    case "todos":
                        itemName = "todoary";
                        break;
                    case "donetodos":
                        itemName = "donetodoary";
                        break;
                    case "projects":
                        itemName = "projectary";
                        break;
                    default:
                        itemName = "todoary";
                }
                dispatch(openModal("No user is currently signed in. ToDos are saved in local storage."));
                localStorage.setItem(itemName, (JSON.stringify(toDosCopy)));
            }
        });
    }

    const createToDo = (heading: string, text: string, date: Date, priority: string) => {
        const toDosCopy = [...toDos];
        const iD = idGenerator.generateID();
        const newToDo:ToDoInterface = todoObject(heading, text, date, priority, iD, []);
        toDosCopy.push(newToDo);
        dispatch(addToDo(newToDo));
        updateDatabase(toDosCopy, "todos");
    }

    return (
        <div id={"content"} className={contentClass}>
            <RouteSwitch />
            <NewToDoForm newToDo={() => {}}/>
            <NewProjectForm formVisible={projectFormVisible} close={() => {}} createProject={() => {}}/>
        </div>
    )
}