import React from "react";
import {ProjectInterface} from "./d";

export default function Project(props: { project: ProjectInterface }) {
    let priorityColor;
    switch (props.project.priority) {
        case 'High':
            priorityColor = 'red';
            break;
        case 'Standard':
            priorityColor = 'orange';
            break;
        case 'Low':
            priorityColor = 'green';
            break;
        case 'Normal':
            priorityColor = 'skyblue';
            break;
        case 'Urgent':
            priorityColor = 'crimson';
            break;
        default:
            priorityColor = 'gray';
            break
    }
        return (
            <div className="projectcontainer">
                <div className="project" id="9480">
                    <div className="labelstripe" style={{backgroundColor: priorityColor}}></div>
                    <div className="middlediv">
                        <div className="checkboxdiv">
                            <div className="checkbox">✓</div>
                        </div>
                        <div className="projectcontent">
                            <div className="projectname">{props.project.name}</div>
                            <div className="tododate">
                                <div><span className="material-symbols-outlined">calendar_month</span></div>
                                <div>19.1.2023 (13 days left)</div>
                            </div>
                            <div className="todopriority">
                                <div className="prioritycircle" style={{backgroundColor: priorityColor}}></div>
                                <div>{props.project.priority} priority</div>
                            </div>
                        </div>
                        <div className="buttondiv">
                            <button className="editbutton">
                                <span className="material-symbols-outlined">edit</span>
                            </button>
                            <button className="deletebutton">
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                        </div>
                    </div>
                    <div className="expandbutton"><span
                        className="material-symbols-outlined">expand_more</span></div>
                </div>
                <div className="projecttododiv" style={{display: "none"}}>
                    <div className="projecttodoscontainer">
                        <div className="notodosdiv">
                            <div className="notodos">No ToDos for this project yet</div>
                            <button className="addtodobutton">Add/Remove ToDos</button>
                        </div>
                    </div>
                </div>
            </div>
        );
}