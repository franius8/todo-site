import React from "react";
import Header from "./Header";
import ToDo from "./ToDo";
import NewToDoForm from "./NewToDoForm";
import "./header.css";
import {ToDoInterface} from "./d";

export default function Home(props: { formVisible: boolean, newToDo: () => void, closeToDo: () => void, toDos: ToDoInterface[] }) {
    if (props.toDos.length > 0) {
        return (
            <>
                <Header active={"home"} newTodo={props.newToDo}/>
                <div id={"tododiv"}>
                    {props.toDos.map((toDo) => <ToDo toDo={toDo}/>)}
                </div>
                <NewToDoForm formVisible={props.formVisible} close={props.closeToDo}/>
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
                <NewToDoForm formVisible={props.formVisible} close={props.closeToDo}/>
            </>
        );
    }
}