import React, {useEffect, useState} from "react";
import {ProjectInterface, ToDoInterface} from "./Modules/d";
import ElementPriority from "./ElementPriority";
import ElementButtonDiv from "./ElementButtonDiv";
import EditFormButtonDiv from "./EditFormButtonDiv";
import dateConverter from "./Modules/DateConverter";
import ProjectToDoContainer from "./ProjectToDoContainer";
import styled from "styled-components";
import {priorityGetter} from "./Modules/priorityGetter";
import ElementDate from "./ElementDate";

const ProjectContentForm = styled.form`
    display: flex;
    gap: 1rem;
`

// Component used for displaying a project waiting to be done
export default function Project(props: { project: ProjectInterface, openToDoForm: (project: ProjectInterface) => void,
    deleteProject: (project: ProjectInterface) => void,
    modifyProject: (iD: number, name: string, date: string, priority: string, toDosAry: ToDoInterface[]) => void,
    moveToDone: (project: ProjectInterface) => void }) {
    const [name, setName] = useState(props.project.name);
    const [date, setDate] = useState(props.project.date);
    const [priority, setPriority] = useState(props.project.priority);
    const [projectToDoVisible, setProjectToDoVisible] = useState(false);
    const [projectClass, setProjectClass] = useState("project");
    const [duringEdit, setDuringEdit] = useState(false);
    const [priorityColor, setPriorityColor] = useState(priorityGetter(props.project.priority));

    useEffect(() => {
        setPriorityColor(priorityGetter(priority));
    }, [priority]);

    // Function used for toggling the visibility of the ToDo container below the project
    const toggleToDos = () => {
        setProjectToDoVisible(!projectToDoVisible);
        const newProjectClass = projectClass === "project" ? "project expanded" : "project";
        setProjectClass(newProjectClass);
    }

    // Function used for toggling the edit mode of the project
    const toggleEdit = () => setDuringEdit(!duringEdit);

    // Function for submitting a project delete
    const handleDeleteProject = () => props.deleteProject(props.project);

    // Function used for handling the name change during edit
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

    // Function used for handling the date change during edit
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setDate(dateConverter.convertToInputFormat(new Date(e.target.value)));


    // Function to handle the change of the priority during edit
    const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => setPriority(e.target.value);

    // Function used for submitting the changes made to the project
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.modifyProject(props.project.iD, name, date, priority, props.project.toDosAry);
        setDuringEdit(false);
    }

    // Function used for moving the project to the done list
    const moveToDone = () => props.moveToDone(props.project);

    if (!duringEdit) {
        return (
            <div className="projectcontainer">
                <div className={projectClass}>
                    <div className="labelstripe" style={{backgroundColor: priorityColor}} />
                    <div className="middlediv">
                        <div className="checkboxdiv">
                            <div className="checkbox" onClick={moveToDone} role="button">✓</div>
                        </div>
                        <div className="projectcontent">
                            <div className="projectname">{name}</div>
                            <ElementDate date={date} done={false} />
                            <ElementPriority priority={priority} priorityColor={priorityColor} done={false}/>
                        </div>
                        <ElementButtonDiv delete={handleDeleteProject} toggleEdit={toggleEdit} />
                    </div>
                    <div className="expandbutton" onClick={toggleToDos} role="button">
                        <span className={`material-symbols-outlined ${projectToDoVisible ? "rotate" : ""}`}>expand_less</span>
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
                    <div className="labelstripe" style={{backgroundColor: priorityColor}} />
                    <div className="middlediv">
                        <div className="checkboxdiv">
                            <div className="checkbox">✓</div>
                        </div>
                        <div>
                            <ProjectContentForm id="editform" onSubmit={handleSubmit}>
                                <div className="inputdiv">
                                    <label htmlFor="projectnameedit">Name:</label>
                                    <input type="text" name="projectnameedit" id="projectnameedit" required
                                           onChange={handleNameChange} value={name}/>
                                </div>
                                <div className="inputdiv">
                                    <label htmlFor="projectdateedit">Due date:</label>
                                    <input type="date" name="projectdateedit" id="projectdateedit" required
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
                            </ProjectContentForm>
                        </div>
                        <EditFormButtonDiv toggleEdit={toggleEdit} />
                    </div>
                    <div className="expandbutton" onClick={toggleToDos} role="button">
                        <span className="material-symbols-outlined">{projectToDoVisible ? "expand_more" : "expand_less"}</span>
                    </div>
                </div>
                <ProjectToDoContainer visible={projectToDoVisible} project={props.project}
                                      openToDoForm={props.openToDoForm}/>
            </div>
        )
    }
}