import React, {useEffect, useState} from "react";

// Component for displaying a box with the priority of a project or to-do
export default function ElementPriority(props: { priority: string, done: boolean }) {
    const [color, setColor] = useState("")

    useEffect(() => {
        switch (props.priority) {
            case "High":
                setColor("bg-red-500")
                break;
            case "Medium":
            case "Standard":
                setColor("bg-yellow-500")
                break;
            case "Low":
                setColor("bg-green-500")
                break;
            case "Urgent":
                setColor("bg-red-500")
                break;
            case "Normal":
                setColor("bg-blue-500")
                break;
            default:
                setColor("bg-gray-500")
        }
    }, [props.priority])

    return (
        <div className="todopriority">
            <div className={`prioritycircle rounded-full w-3 h-3 ${color}`} />
            <div>{props.priority} {props.done ? "" : "priority"}</div>
        </div>
    )
}