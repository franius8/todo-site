import React, { useState } from "react";
import ElementDate from "./ElementDate";
import ElementPriority from "./ElementPriority";
import {ToDoInterface} from "./Modules/d";
import GenericItemContainer from "./GenericItemContainer";

// Component for displaying done ToDo elements
export default function DoneToDoElement(props: { toDo: ToDoInterface, deleteToDo: (toDo:ToDoInterface) => void,
revertDone: (toDo: ToDoInterface) => void} ) {

    const [heading] = useState(props.toDo.heading)
    const [text] = useState(props.toDo.text)
    const [date] = useState(props.toDo.date)
    const [dusingEdit, setDuringEdit] = useState(false)

    // Function for toggling between edit and display mode
    const toggleEdit = () => {
        setDuringEdit(!dusingEdit)
    }

    // Function for deleting ToDo element
    const deleteToDo = () => {
        props.deleteToDo(props.toDo)
    }

    // Function for reverting ToDo element to the ToDo list
    const revertDone = () => {
        props.revertDone(props.toDo)
    }


    return (
        <GenericItemContainer toggleEdit={toggleEdit} move={revertDone} priority={"Done"} delete={deleteToDo} done={true}>
            <div className="todocontent">
                <div className="todoheading">{heading}</div>
                <div className="todotext">{text}</div>
                <ElementDate date={date} done />
                <ElementPriority priority={"Done"} done />
            </div>
        </GenericItemContainer>
    )
}