import React from "react";

export default function ProjectToDoContainer(props: { visible: boolean }) {
    if (props.visible) {
        return (
            <div className="projecttododiv" style={{display: "block"}}>
                <div className="projecttodoscontainer">
                    <div className="notodosdiv">
                        <div className="notodos">No ToDos for this project yet</div>
                        <button className="addtodobutton">Add/Remove ToDos</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}