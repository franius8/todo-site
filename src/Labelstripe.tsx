import React, {useEffect, useState} from "react";

export default function Labelstripe(props: { priority: string }) {
    const [color, setColor] = useState("")

    useEffect(() => {
        switch (props.priority) {
            case "High":
                setColor("bg-red-500")
                break;
            case "Medium":
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
        <div className={`rounded-l-xl ${color}`}/>
    )
}