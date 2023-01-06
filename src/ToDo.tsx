import React from "react";
import {ToDoInterface} from "./d";

export default function ToDo(props: { toDo: ToDoInterface }) {
        let priorityColor;
            switch (props.toDo.priority) {
            case 'High':
                priorityColor = 'red';
                break;
            case 'Standard':
               priorityColor = 'orange';
               break;
            case 'Low':
                priorityColor = 'green';
                break;
            case 'Normal':
                priorityColor = 'skyblue';
                break;
            case 'Urgent':
                priorityColor = 'crimson';
                break;
            default:
                priorityColor = 'gray';
                break
        }
    return (
        <div className="todo">
            <div className="labelstripe" style={{backgroundColor: priorityColor}}></div>
            <div className="middlediv">
                <div className="checkboxdiv">
                    <div className="checkbox">✓</div>
                </div>
                <div className="todocontent">
                    <div className="todoheading">{props.toDo.heading}</div>
                    <div className="todotext">{props.toDo.text}</div>
                    <div className="tododate">
                        <div><span className="material-symbols-outlined">calendar_month</span></div>
                        <div>12.1.2023 (6 days left)</div>
                    </div>
                    <div className="todopriority">
                        <div className="prioritycircle" style={{backgroundColor: priorityColor}}></div>
                        <div>{props.toDo.priority} priority</div>
                    </div>
                </div>
                <div className="buttondiv">
                    <button className="editbutton"><span
                        className="material-symbols-outlined">edit</span></button>
                    <button className="deletebutton"><span
                        className="material-symbols-outlined">delete</span></button>
                </div>
            </div>
        </div>
    );
}