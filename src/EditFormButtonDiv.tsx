import React from "react";

// Component for displaying the ToDos and Projects edit form buttons
export default function EditFormButtonDiv(props: { toggleEdit: () => void}) {
    return (
        <div className="buttondiv">
            <button className="cancelbutton" type={"button"} onClick={props.toggleEdit}>
                <span className="material-symbols-outlined">undo</span>
            </button>
            <button className="acceptbutton" type="submit" form="editform">
                <span className="material-symbols-outlined">check</span></button>
        </div>
    )
};