import React from "react";
import "./stylesheets/ProjectToDoContainer.css";
import {ProjectInterface, ToDoInterface} from "./Modules/d";
import dateConverter from "./Modules/DateConverter";

export default function ProjectToDoContainer(props: { visible: boolean, openToDoForm: (project: ProjectInterface) => void, project: ProjectInterface }) {
    const determinePriorityColor = (priority: string) => {
        if (priority === "High") {
            return "red";
        } else if (priority === "Medium") {
            return "yellow";
        } else {
            return "green";
        }
    }

    console.log(props.project.toDosAry);

    if (props.visible && props.project.toDosAry.length == 0) {
        return (
            <div className="projecttododiv" style={{display: "block"}}>
                <div className="projecttodoscontainer">
                    <div className="notodosdiv">
                        <div className="notodos">No ToDos for this project yet</div>
                        <button className="addtodobutton" onClick={() => props.openToDoForm(props.project)}>Add/Remove ToDos</button>
                    </div>
                </div>
            </div>
        );
    } else if (props.visible) {
        return (
            <div className="projecttododiv" style={{display: "block"}}>
                <div className="projecttodoscontainer">
                    <div className="notodosdiv">
                        <button className="addtodobutton" onClick={() => props.openToDoForm(props.project)}>Add/Remove ToDos</button>
                    </div>
                        {props.project.toDosAry.map(({iD, heading, text, priority, date}, index) => {
                            return (
                                <div className="projecttodo" key={props.project.iD + " " + iD}>
                                    <div className="labelstripe" style={{backgroundColor: determinePriorityColor(priority)}}></div>
                                    <div className="todocontent">
                                        <div className="todoheading">{heading}</div>
                                        <div className="todotext">{text}</div>
                                        <div className="tododate">
                                            <div><span className="material-symbols-outlined">calendar_month</span></div>
                                            <div>{dateConverter.convertToString(date)} ({dateConverter.getDayDifference(date)} days left)</div>
                                        </div>
                                        <div className="todopriority">
                                            <div className="prioritycircle" style={{backgroundColor: determinePriorityColor(priority)}}></div>
                                            <div>{priority} priority</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                        }

                </div>
            </div>
        )
    } else {
        return null;
    }
}