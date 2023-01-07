import React, { useEffect, useState } from "react";
import Header from "./Header";
import ToDo from "./ToDo";
import NewToDoForm from "./NewToDoForm";
import "./header.css";
import { ToDoInterface } from "./d";
import idGenerator from "./idGenerator";
import todoObject from "./todoObject";
import dateFixer from "./datefixer";

import {getAuth, onAuthStateChanged} from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, addDoc, getDoc, doc, setDoc, onSnapshot, updateDoc } from "firebase/firestore";


export default function Home(props: { formVisible: boolean, newToDo: () => void, closeToDo: () => void,
    toDos: ToDoInterface[], modifyToDo: (iD: number, heading: string, text: string, date: Date, priority: string) => void }) {
    const [toDos, setToDos] = useState<ToDoInterface[]>([]);
    const [loggedIn, setLoggedIn] = useState<boolean>();

    useEffect(() => {
        const toDoAry: ToDoInterface[] = [];
        let rawToDoAry: any[] = [];
        onAuthStateChanged(auth,  async (user) => {
            if (user) {
                await onSnapshot(doc(db, "users", user.uid), (doc) => {
                    rawToDoAry = JSON.parse(doc.data()?.todos || "[]");
                    setToDos(convertRawToDos(rawToDoAry));
                });
            } else {
                rawToDoAry = JSON.parse(localStorage.getItem("todoary") || "[]");
                setToDos(convertRawToDos(rawToDoAry));
            }
        });
    }, []);

    const convertRawToDos = (rawToDoAry: any[]) => {
        const toDoAry: ToDoInterface[] = [];
        rawToDoAry.forEach((todo: ToDoInterface) => {
            todo.date = dateFixer.fixDates(todo.date);
            toDoAry.push(todoObject(todo.heading, todo.text, todo.date, todo.priority, todo.iD, todo.projectiDs));
        });
        return toDoAry;
    }

    const updateDatabase = async (toDosCopy: ToDoInterface[]) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                try {
                    const docRef = await updateDoc(doc(collection(db, "users"), uid), {
                        todos: JSON.stringify(toDosCopy)
                    });
                } catch (e) {
                }
            } else {
                alert("No user is currently signed in. ToDos are saved in local storage.");
                localStorage.setItem('todoary', (JSON.stringify(toDosCopy)));
            }
        });
    }

    const createToDo = (heading: string, text: string, date: Date, priority: string) => {
        const toDosCopy = [...toDos];
        const iD = idGenerator.generateID();
        const newToDo:ToDoInterface = todoObject(heading, text, date, priority, iD, []);
        toDosCopy.push(newToDo);
        setToDos(toDosCopy);
        updateDatabase(toDosCopy);
    }

    const modifyToDo = (iD: number, heading: string, text: string, date: Date, priority: string) => {
        let toDosCopy = [...toDos];
        toDosCopy = toDosCopy.filter(x => x.iD !== iD)
        const newToDo:ToDoInterface = todoObject(heading, text, date, priority, iD, []);
        toDosCopy.push(newToDo);
        setToDos(toDosCopy);
        updateDatabase(toDosCopy);
    }
    const deleteToDo = (iD: number) => {
        if (confirm('Are you sure you want to delete that?\n(This is an irreversible operation)')) {
            const toDosCopy = [...toDos].filter(x => x.iD !== iD);
            idGenerator.freeID(iD);
            updateDatabase(toDosCopy);
            setToDos(toDosCopy);
        }
    }
    if (toDos.length > 0) {
        return (
            <>
                <Header active={"home"} newTodo={props.newToDo}/>
                <div id={"tododiv"}>
                    {toDos.map((toDo) => <ToDo toDo={toDo} key={toDo.iD} modifyToDo={modifyToDo}
                    deleteToDo={deleteToDo}/>)}
                </div>
                <NewToDoForm formVisible={props.formVisible} close={props.closeToDo} newToDo={createToDo}/>
            </>
        );
    } else {
        return (
            <>
                <Header active={"home"} newTodo={props.newToDo}/>
                <div id={"tododiv"}>
                    <div id="actiondiv">
                        No ToDos yet. Time to <span id="addnew" onClick={props.newToDo}>add a new one</span>.
                    </div>
                </div>
                <NewToDoForm formVisible={props.formVisible} close={props.closeToDo} newToDo={createToDo}/>
            </>
        );
    }
}