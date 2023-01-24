import React from "react";
import {FaCheck} from "react-icons/fa";
import {GrRevert} from "react-icons/all";

// Component for displaying the ToDos and Projects edit form buttons
export default function EditFormButtonDiv(props: { toggleEdit: () => void}) {
    return (
        <div className="flex gap-1 flex-col">
            <button className="p-2 flex justify-center bg-gray-300 rounded-lg hover:bg-gray-400 hover:shadow-xl transition-all"
                    type={"button"} onClick={props.toggleEdit}>
                <GrRevert/>
            </button>
            <button className="p-2 flex justify-center bg-green-600 rounded-lg text-white hover:bg-green-700 hover:shadow-xl transition-all"
                    type="submit" form="editform">
                <FaCheck/>
            </button>
        </div>
    )
};