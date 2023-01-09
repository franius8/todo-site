import React, { useState } from "react";
import {ProjectInterface} from "./Modules/d";
import dateConverter from "./Modules/DateConverter";
import ProjectToDoContainer from "./ProjectToDoContainer";
import DateConverter from "./Modules/DateConverter";

export default function Project(props: { project: ProjectInterface, openToDoForm: (project: ProjectInterface) => void,
    deleteProject: (project: ProjectInterface) => void,
    modifyProject: (iD: number, name: string, date: string, priority: string) => void }) {
    const [name, setName] = useState(props.project.name);
    const [date, setDate] = useState(props.project.date);
    const [priority, setPriority] = useState(props.project.priority);
    const [projectToDoVisible, setProjectToDoVisible] = useState(false);
    const [projectClass, setProjectClass] = useState("project");
    const [duringEdit, setDuringEdit] = useState(false);

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

    const toggleEdit = () => {
        setDuringEdit(!duringEdit);
    }

    const handleDeleteProject = () => {
        props.deleteProject(props.project);
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(dateConverter.convertToInputFormat(new Date(e.target.value)));
    }

    const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPriority(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.modifyProject(props.project.iD, name, date, priority);
        setDuringEdit(false);
    }

    if (!duringEdit) {
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
                                <div>{props.project.date} ({dateConverter.getDayDifference(new Date(props.project.date))} days
                                    left)
                                </div>
                            </div>
                            <div className="todopriority">
                                <div className="prioritycircle" style={{backgroundColor: priorityColor}}></div>
                                <div>{props.project.priority} priority</div>
                            </div>
                        </div>
                        <div className="buttondiv">
                            <button className="editbutton" onClick={toggleEdit}>
                                <span className="material-symbols-outlined">edit</span>
                            </button>
                            <button className="deletebutton" onClick={handleDeleteProject}>
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                        </div>
                    </div>
                    <div className="expandbutton" onClick={toggleToDos}>
                        <span className="material-symbols-outlined">expand_more</span>
                    </div>
                </div>
                <ProjectToDoContainer visible={projectToDoVisible} project={props.project}
                                      openToDoForm={props.openToDoForm}/>
            </div>
        );
    } else {
        return (
            <div className="projectcontainer">
                <div className={projectClass}>
                    <div className="labelstripe" style={{backgroundColor: priorityColor}}></div>
                    <div className="middlediv">
                        <div className="checkboxdiv">
                            <div className="checkbox">✓</div>
                        </div>
                        <div className="projectcontent">
                            <form className="projectcontent" id="editform" onSubmit={handleSubmit}>
                                <div className="inputdiv">
                                    <label htmlFor="projectnameedit">Name:</label>
                                    <input type="text" name="projectnameedit" id="projectnameedit" required={true}
                                           onChange={handleNameChange} value={name}/>
                                </div>
                                <div className="inputdiv">
                                    <label htmlFor="projectdateedit">Due date:</label>
                                    <input type="date" name="projectdateedit" id="projectdateedit" required={true}
                                           onChange={handleDateChange} value={date}/>
                                </div>
                                <div className="inputdiv">
                                    <label htmlFor="radiocontainer">Priority:</label>
                                    <div className="radiocontainer">
                                        <input type="radio" name="projectpriorityedit" value="Normal" id="Normal"
                                               onChange={handlePriorityChange} checked={priority === "Normal"}/>
                                        <label htmlFor="Normal">Normal</label>
                                        <input type="radio" name="projectpriorityedit" value="Urgent" id="Urgent"
                                               onChange={handlePriorityChange} checked={priority === "Urgent"}/>
                                        <label htmlFor="Urgent">Urgent</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="buttondiv">
                            <button className="cancelbutton" onClick={toggleEdit}>
                                <span className="material-symbols-outlined">undo</span>
                            </button>
                            <button className="acceptbutton" type="submit" form="editform">
                                <span className="material-symbols-outlined">check</span>
                            </button>
                        </div>
                    </div>
                    <div className="expandbutton" onClick={toggleToDos}>
                        <span className="material-symbols-outlined">expand_more</span>
                    </div>
                </div>
                <ProjectToDoContainer visible={projectToDoVisible} project={props.project}
                                      openToDoForm={props.openToDoForm}/>
            </div>
        )
    }
}