import React from "react";
import {FaCheck} from "react-icons/fa";

export default function Checkbox(props: { onClick: () => void }) {
    return (
        <div className="checkboxdiv">
            <div className="p-2 checkbox text-xl rounded-xl flex items-center justify-center border-green-600 text-green-600
            border-2 hover:bg-green-600 hover:text-white transition-all"
                 onClick={props.onClick} role="button">
                <FaCheck/>
            </div>
        </div>
    )
}