import React, { useState } from "react";
import Header from "./Header";
import ToDo from "./ToDo";
import "./Stylesheets/header.css";
import { ToDoInterface } from "./Modules/d";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Modules/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {toggleToDoForm} from "./Redux/modalSlice";

export default function Home(props: {
    formVisible: boolean,
    newToDo: () => void, closeToDo: () => void,
    toDos: ToDoInterface[],
    modifyToDo: (iD: number, heading: string, text: string, date: string, priority: string) => void,
    deleteToDo: (iD: number) => void,
    createToDo: (heading: string, text: string, date: string, priority: string) => void,
}) {

    const dispatch = useDispatch();

    const toDoList = useSelector((state: {  content: {toDos: ToDoInterface[]} }) => state.content.toDos);

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

    const moveToDone = (iD: number) => {
    }

    if (toDoList.length > 0) {
        return (
            <>
                <Header active={"home"} newTodo={props.newToDo}/>
                <div id={"tododiv"}>
                    {toDoList.map((toDo) => <ToDo toDo={toDo} key={toDo.iD} modifyToDo={props.modifyToDo}
                    deleteToDo={props.deleteToDo} moveToDone={moveToDone}/>)}
                </div>
            </>
        );
    } else {
        return (
            <>
                <Header active={"home"} newTodo={props.newToDo}/>
                <div id={"tododiv"}>
                    <div id="actiondiv">
                        No ToDos yet. Time to <span id="addnew" onClick={() => dispatch(toggleToDoForm())}>add a new one</span>.
                    </div>
                </div>
            </>
        );
    }
}