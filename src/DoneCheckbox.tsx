import React from "react";
import { FaTrashRestore } from "react-icons/fa";

export default function DoneCheckbox(props: { onClick: () => void }) {
    return (
        <div className="checkboxdiv">
            <div className="p-2 checkbox text-xl rounded-xl flex items-center justify-center border-red-600
            text-red-600 border-2 transition-all hover:bg-red-600 hover:text-white"
                 onClick={props.onClick} role="button">
                <FaTrashRestore/>
            </div>
        </div>
    )
}