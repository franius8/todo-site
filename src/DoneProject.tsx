import React, { useState } from "react";
import ProjectToDoContainer from "./ProjectToDoContainer";
import ElementButtonDiv from "./ElementButtonDiv";
import ElementDate from "./ElementDate";
import ElementPriority from "./ElementPriority";
import EditFormButtonDiv from "./EditFormButtonDiv";
import {ProjectInterface, ToDoInterface} from "./Modules/d";
import styled from "styled-components";
import DoneCheckbox from "./DoneCheckbox";

const ProjectContentForm = styled.form`
    display: flex;
    gap: 1rem;
`

// Component for displaying a done project
export default function DoneProject(props: { project: ProjectInterface,
    openToDoForm: (project: ProjectInterface) => void,
    modifyProject: (iD: number, name: string, date: string, priority: string, toDosAry: ToDoInterface[]) => void,
    deleteProject: (project: ProjectInterface) => void,
    revertProject: (project: ProjectInterface) => void }) {
    const [name, setName] = useState(props.project.name)
    const [date] = useState(props.project.date)
    const [projectToDoVisible, setProjectToDoVisible] = useState(false);
    const [duringEdit, setDuringEdit] = useState(false);

    // Function for handling name change during edit
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.name)

    // Function for toggling edit state
    const toggleEdit = () => setDuringEdit(!duringEdit)

    // Function for deleting a project
    const handleDeleteProject = () => {
        props.deleteProject(props.project)
    }

    // Function for reverting a project to the projects list
    const revertProject = () => {
        props.revertProject(props.project)
    }

    // Function for handling submit of the edit form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        props.modifyProject(props.project.iD, name, date, props.project.priority, props.project.toDosAry)
        setDuringEdit(false)
    }

    // Function for toggling the visibility of the project's to do list
    const toggleToDos = () => setProjectToDoVisible(!projectToDoVisible)


    if (!duringEdit) {
        return (
            <div className="projectcontainer shadow-lg border-2 border-gray-200 rounded-xl transition-all hover:bg-gray-100">
                <div className={"project"}>
                    <div className="labelstripe bg-gray-500 rounded-l-xl"/>
                    <div className="middlediv">
                        <DoneCheckbox onClick={revertProject}/>
                        <div className="projectcontent">
                            <div className="projectname">{name}</div>
                            <ElementDate date={date} done />
                            <ElementPriority priority={"Done"} priorityColor={"gray"} done />
                        </div>
                        <ElementButtonDiv toggleEdit={toggleEdit} delete={handleDeleteProject} />
                    </div>
                    <div className="expandbutton" role="button" onClick={toggleToDos}>
                    <span
                        className={`material-symbols-outlined ${projectToDoVisible ? "rotate" : ""}`}>expand_less</span>
                    </div>
                </div>
                <ProjectToDoContainer visible={projectToDoVisible} project={props.project}
                                      openToDoForm={props.openToDoForm}/>
            </div>
        )
    } else {
        return (
            <div className="projectcontainer">
                <div className={"doneproject"}>
                    <div className="labelstripe" style={{backgroundColor: "gray"}} />
                    <div className="middlediv">
                        <div className="checkboxdiv">
                            <div className="checkbox" role="button">✓</div>
                        </div>
                        <div>
                            <ProjectContentForm id="editform" onSubmit={handleSubmit}>
                                <div className="inputdiv">
                                    <label htmlFor="projectnameedit">Name:</label>
                                    <input type="text" name="projectnameedit" id="projectnameedit" required
                                           onChange={handleNameChange} value={name}/>
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