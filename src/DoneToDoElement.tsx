import React, { useState } from "react";
import ElementButtonDiv from "./ElementButtonDiv";
import ElementDate from "./ElementDate";
import ElementPriority from "./ElementPriority";
import {ToDoInterface} from "./Modules/d";

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
        <div className="todo">
            <div className="labelstripe" style={{backgroundColor: "gray"}} />
            <div className="middlediv">
                <div className="checkboxdiv">
                    <div className="checkbox donecheckbox" onClick={revertDone}>↺</div>
                </div>
                <div className="todocontent">
                    <div className="todoheading">{heading}</div>
                    <div className="todotext">{text}</div>
                    <ElementDate date={date} done={true} />
                    <ElementPriority priority={"Done"} priorityColor={"gray"} done={true} />
                </div>
                <ElementButtonDiv delete={deleteToDo} toggleEdit={toggleEdit} />
            </div>
        </div>
    )
}