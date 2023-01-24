import React from "react";
import {FaEdit, FaTrash} from "react-icons/all";

// A generiv div for ToDos and project buttons
export default function ElementButtonDiv(props: { toggleEdit: () => void, delete: () => void }) {
    return (
        <div className="flex gap-1 flex-col">
            <button className="p-2 flex justify-center bg-gray-300 rounded-lg hover:bg-gray-400 hover:shadow-xl transition-all"
                    onClick={props.toggleEdit}>
               <FaEdit/></button>
            <button className="p-2 flex justify-center bg-red-600 rounded-lg text-white hover:bg-red-700 hover:shadow-xl transition-all"
                    onClick={props.delete}>
                <FaTrash /></button>
        </div>
    )
}