import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import {ToDoInterface} from "./Modules/d";

export default function Done() {
    const doneToDos = useSelector((state: { content: { doneToDos: ToDoInterface } }) => state.content.doneToDos)

    return (
        <>
            <Header active={"done"}/>
            <div id={"donediv"}>
                <div id="actiondiv">No ToDos marked as done.</div>
            </div>
        </>
    );
}