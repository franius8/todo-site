import React from "react";
import Header from "./Header";
import ToDoElement from "./ToDoElement";
import "./Stylesheets/header.css";
import { ToDoInterface } from "./Modules/d";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleToDoForm } from "./Redux/modalSlice";
import {addDone, setToDos} from "./Redux/contentSlice";

export default function Home(props: {
    formVisible: boolean,
    modifyToDo: (iD: number, heading: string, text: string, date: string, priority: string) => void,
    deleteToDo: (iD: number) => void,
    createToDo: (heading: string, text: string, date: string, priority: string) => void,
}) {

    const dispatch = useDispatch();

    const toDoList = useSelector((state: {  content: {toDos: ToDoInterface[]} }) => state.content.toDos);

    const moveToDone = (iD: number) => {
        const toDosCopy = [...toDoList];
        const toDo = toDosCopy.find((toDo: ToDoInterface) => toDo.iD === iD);
        const filteredToDos = toDosCopy.filter((toDo: ToDoInterface) => toDo.iD !== iD);
        if (toDo) {
            props.modifyToDo(iD, toDo.heading, toDo.text, toDo.date, "done");
        }
        dispatch(setToDos(filteredToDos));
        dispatch(addDone(toDo as ToDoInterface));

    }

    if (toDoList.length > 0) {
        return (
            <>
                <Header active={"home"}/>
                <div id={"tododiv"}>
                    {toDoList.map((toDo) => <ToDoElement toDo={toDo} key={toDo.iD} modifyToDo={props.modifyToDo}
                                                         deleteToDo={props.deleteToDo}/>)}
                </div>
            </>
        );
    } else {
        return (
            <>
                <Header active={"home"}/>
                <div id={"tododiv"}>
                    <div id="actiondiv">
                        No ToDos yet. Time to <span id="addnew" onClick={() => dispatch(toggleToDoForm())}>add a new one</span>.
                    </div>
                </div>
            </>
        );
    }
}