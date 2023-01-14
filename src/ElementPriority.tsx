import React from "react";

// Component for displaying a box with the priority of a project or to-do
export default function ElementPriority(props: { priority: string, priorityColor: string, done: boolean }) {
    return (
        <div className="todopriority">
            <div className="prioritycircle" style={{backgroundColor: props.priorityColor}} />
            <div>{props.priority} {props.done ? "" : "priority"}</div>
        </div>
    )
}