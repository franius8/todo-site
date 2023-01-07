import React, { useEffect, useState } from "react";
import Header from "./Header";
import ToDo from "./ToDo";
import NewToDoForm from "./NewToDoForm";
import "./Stylesheets/header.css";
import { ToDoInterface } from "./d";

import {getAuth, onAuthStateChanged} from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

export default function Home(props: {
    formVisible: boolean,
    newToDo: () => void, closeToDo: () => void,
    toDos: ToDoInterface[],
    modifyToDo: (iD: number, heading: string, text: string, date: Date, priority: string) => void,
    deleteToDo: (iD: number) => void,
    createToDo: (heading: string, text: string, date: Date, priority: string) => void,
}) {

    const [toDos, setToDos] = useState<ToDoInterface[]>(props.toDos);

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
        const toDo = toDos.filter(x => x.iD === iD)[0];
        const toDosCopy = [...toDos].filter(x => x.iD !== iD);
        updateDatabase(toDosCopy);
        setToDos(toDosCopy);
    }
    const createToDo = (heading: string, text: string, date: Date, priority: string) => {

    }

    if (props.toDos.length > 0) {
        return (
            <>
                <Header active={"home"} newTodo={props.newToDo}/>
                <div id={"tododiv"}>
                    {props.toDos.map((toDo) => <ToDo toDo={toDo} key={toDo.iD} modifyToDo={props.modifyToDo}
                    deleteToDo={props.deleteToDo} moveToDone={moveToDone}/>)}
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