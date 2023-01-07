import React from "react";

export default function ProjectToDoForm(props: { visible: boolean, close: () => void }) {
    if (props.visible) {
        return (
            <div id="projecttodosformdiv" style={{display: "block"}}>
                <div id="closebuttondiv">
                    <button id="closebutton"><span className="material-symbols-outlined">close</span></button>
                </div>
                <h2 className="formheading">Add new ToDos to Project</h2>
                <form>
                    <div className="inputdiv"><label htmlFor="projectcheckboxdiv">Select ToDos:</label>
                        <div className="projectcheckboxdiv">
                        </div>
                    </div>
                    <button type="submit" id="todosubmit">Add</button>
                </form>
            </div>
        )
    } else {
        return null;
    }
}