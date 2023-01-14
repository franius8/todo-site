import React from "react";

export default function ElementPriority(props: { priority: string, priorityColor: string, done: boolean }) {
    return (
        <div className="todopriority">
            <div className="prioritycircle" style={{backgroundColor: props.priorityColor}} />
            <div>{props.priority} {props.done ? "" : "priority"}</div>
        </div>
    )
}