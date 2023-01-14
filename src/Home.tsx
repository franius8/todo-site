import React from "react";
import Header from "./Header";
import ToDoElement from "./ToDoElement";
import "./Stylesheets/header.css";
import { ToDoInterface } from "./Modules/d";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleToDoForm } from "./Redux/modalSlice";
import { addDone, setToDos } from "./Redux/contentSlice";
import  {auth } from "./Modules/firebase";

export default function Home() {

    const dispatch = useDispatch();

    const toDoList = useSelector((state: {  content: {toDos: ToDoInterface[]} }) => state.content.toDos);

    const moveToDone = (iD: number) => {
        const toDosCopy = [...toDoList];
        const toDo = toDosCopy.find((toDo: ToDoInterface) => toDo.iD === iD);
        const filteredToDos = toDosCopy.filter((toDo: ToDoInterface) => toDo.iD !== iD);
        if (toDo) {
            modifyToDo(iD, toDo.heading, toDo.text, toDo.date, "done", toDo.projectiDs);
        }
        dispatch(setToDos(filteredToDos));
        dispatch(addDone(toDo as ToDoInterface));

    }

    const modifyToDo = (iD: number, heading: string, text: string, date: string, priority: string, projectiDs: number[]) => {
        const toDosCopy = [...toDoList].filter(x => x.iD !== iD);
        const toDo: ToDoInterface = {iD, heading, text, date, priority, projectiDs};
        toDosCopy.push(toDo);
        dispatch(setToDos(toDosCopy));

    }

    const deleteToDo = (iD: number) => {
        if (confirm('Are you sure you want to delete that?\n(This is an irreversible operation)')) {
            const toDosCopy = [...toDoList].filter(x => x.iD !== iD);
            dispatch(setToDos(toDosCopy));
        }
    }

    if (toDoList.length > 0) {
        return (
            <>
                <Header active={"home"}/>
                <div id={"tododiv"}>
                    {toDoList.map((toDo) => <ToDoElement toDo={toDo} key={toDo.iD} modifyToDo={modifyToDo}
                                                         moveToDone={moveToDone} deleteToDo={deleteToDo}/>)}
                </div>
            </>
        );
    } else {
        return (
            <>
                <Header active={"home"}/>
                <div id={"tododiv"}>
                    <div id="actiondiv">
                        {auth.currentUser?.displayName &&
                           <p>Welcome {auth.currentUser.displayName}!</p>}
                        No ToDos yet. Time to <span id="addnew" onClick={() => dispatch(toggleToDoForm())}>add a new one</span>.
                    </div>
                </div>
            </>
        );
    }
}