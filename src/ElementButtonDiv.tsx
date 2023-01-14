import React from "react";

export default function ElementButtonDiv(props: { toggleEdit: () => void, delete: () => void }) {
    return (
        <div className="buttondiv">
            <button className="editbutton" onClick={props.toggleEdit}>
                <span className="material-symbols-outlined">edit</span></button>
            <button className="deletebutton" onClick={props.delete}>
                <span className="material-symbols-outlined">delete</span></button>
        </div>
    )
}