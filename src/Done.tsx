import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import {ToDoInterface} from "./Modules/d";
import DoneToDoElement from "./DoneToDoElement";
import { StateInterface } from "./Modules/d";
import { addToDo, setDoneList } from "./Redux/contentSlice";
import {useDispatch} from "react-redux";

export default function Done() {
    const dispatch = useDispatch();
    const doneToDos = useSelector((state: StateInterface) => state.content.doneList)

    const deleteToDo = ( { iD }:ToDoInterface ) => {
        console.log(iD)
        if (confirm('Are you sure you want to delete that?\n(This is an irreversible operation)')) {
            const doneToDosCopy = [...doneToDos].filter(x => x.iD !== iD);
            console.log(doneToDosCopy)
            dispatch(setDoneList(doneToDosCopy));
        }
    }

    const revertDone = (toDo: ToDoInterface) => {
        const doneToDosCopy = [...doneToDos].filter(x => x.iD !== toDo.iD);
        dispatch(setDoneList(doneToDosCopy));
        dispatch(addToDo(toDo));
    }

    if (doneToDos.length === 0) {
        return (
            <>
                <Header active={"done"}/>
                <div id={"donediv"}>
                    <div id="actiondiv">No ToDos marked as done.</div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <Header active={"done"}/>
                <div id={"donediv"}>
                    {doneToDos.map((toDo) => {
                        return (
                            <DoneToDoElement key={toDo.iD} toDo={toDo} deleteToDo={deleteToDo} revertDone={revertDone}/>
                        )
                    })}
                </div>
            </>
        );
    }
}