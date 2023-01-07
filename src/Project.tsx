import React from "react";
import {ProjectInterface} from "./d";
import dateConverter from "./DateConverter";
import ProjectToDoContainer from "./ProjectToDoContainer";

export default function Project(props: { project: ProjectInterface }) {
    const [projectToDoVisible, setProjectToDoVisible] = React.useState(false);
    const [projectClass, setProjectClass] = React.useState("project");

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

    const toggleToDos = () => {
        setProjectToDoVisible(!projectToDoVisible);
        const newProjectClass = projectClass == "project" ? "project expanded" : "project";
        setProjectClass(newProjectClass);
    }

        return (
            <div className="projectcontainer">
                <div className={projectClass}>
                    <div className="labelstripe" style={{backgroundColor: priorityColor}}></div>
                    <div className="middlediv">
                        <div className="checkboxdiv">
                            <div className="checkbox">✓</div>
                        </div>
                        <div className="projectcontent">
                            <div className="projectname">{props.project.name}</div>
                            <div className="tododate">
                                <div><span className="material-symbols-outlined">calendar_month</span></div>
                                <div>{dateConverter.convertToString(props.project.date)} ({dateConverter.getDayDifference(props.project.date)} days left)</div>
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
                    <div className="expandbutton" onClick={toggleToDos}>
                        <span className="material-symbols-outlined">expand_more</span>
                    </div>
                </div>
                <ProjectToDoContainer visible={projectToDoVisible}/>
            </div>
        );
}