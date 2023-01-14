import React, { useState } from "react";
import dateConverter from "./Modules/DateConverter";
import {ToDoInterface} from "./Modules/d";

export default function DoneToDoElement(props: { toDo: ToDoInterface, deleteToDo: (toDo:ToDoInterface) => void,
revertDone: (toDo: ToDoInterface) => void} ) {

    const [heading, setHeading] = useState(props.toDo.heading)
    const [text, setText] = useState(props.toDo.text)
    const [date, setDate] = useState(props.toDo.date)
    const [dusingEdit, setDuringEdit] = useState(false)

    const toggleEdit = () => {
        setDuringEdit(!dusingEdit)
    }

    const deleteToDo = () => {
        props.deleteToDo(props.toDo)
    }

    const revertDone = () => {
        props.revertDone(props.toDo)
    }


    return (
        <div className="todo">
            <div className="labelstripe" style={{backgroundColor: "gray"}}></div>
            <div className="middlediv">
                <div className="checkboxdiv">
                    <div className="checkbox donecheckbox" onClick={revertDone}>↺</div>
                </div>
                <div className="todocontent">
                    <div className="todoheading">{heading}</div>
                    <div className="todotext">{text}</div>
                    <div className="tododate">
                        <div><span className="material-symbols-outlined">calendar_month</span></div>
                        <div>
                            {dateConverter.convertToString(new Date(date))}
                        </div>
                    </div>
                    <div className="todopriority">
                        <div className="prioritycircle" style={{backgroundColor: "gray"}}></div>
                        <div>Done</div>
                    </div>
                </div>
                <div className="buttondiv">
                    <button className="editbutton" onClick={toggleEdit}>
                        <span className="material-symbols-outlined">edit</span></button>
                    <button className="deletebutton" onClick={deleteToDo}>
                        <span className="material-symbols-outlined">delete</span></button>
                </div>
            </div>
        </div>
    )
}