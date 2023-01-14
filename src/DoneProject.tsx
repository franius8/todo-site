import React, { useState } from "react";
import ProjectToDoContainer from "./ProjectToDoContainer";
import {ProjectInterface, ToDoInterface} from "./Modules/d";
import styled from "styled-components";

const ProjectContentForm = styled.form`
    display: flex;
    gap: 1rem;
`

export default function DoneProject(props: { project: ProjectInterface,
    openToDoForm: (project: ProjectInterface) => void,
    modifyProject: (iD: number, name: string, date: string, priority: string, toDosAry: ToDoInterface[]) => void,
    deleteProject: (project: ProjectInterface) => void,
    revertProject: (project: ProjectInterface) => void }) {
    const [name, setName] = useState(props.project.name)
    const [date] = useState(props.project.date)
    const [projectToDoVisible, setProjectToDoVisible] = useState(false);
    const [duringEdit, setDuringEdit] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.name)

    const toggleEdit = () => setDuringEdit(!duringEdit)

    const handleDeleteProject = () => {
        props.deleteProject(props.project)
    }

    const revertProject = () => {
        props.revertProject(props.project)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        props.modifyProject(props.project.iD, name, date, props.project.priority, props.project.toDosAry)
        setDuringEdit(false)
    }

    const toggleToDos = () => setProjectToDoVisible(!projectToDoVisible)


    if (!duringEdit) {
        return (
            <div className="projectcontainer">
                <div className={"project"}>
                    <div className="labelstripe" style={{backgroundColor: "grey"}} />
                    <div className="middlediv">
                        <div className="checkboxdiv">
                            <div className="checkbox donecheckbox" onClick={revertProject}>↺</div>
                        </div>
                        <div className="projectcontent">
                            <div className="projectname">{name}</div>
                            <div className="tododate">
                                <div><span className="material-symbols-outlined">calendar_month</span></div>
                                <div>{date}</div>
                            </div>
                            <div className="todopriority">
                                <div className="prioritycircle" style={{backgroundColor: "gray"}} />
                                <div>Done</div>
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
                            <div className="checkbox">✓</div>
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
                        <span className="material-symbols-outlined">{projectToDoVisible ? "expand_more" : "expand_less"}</span>
                    </div>
                </div>
                <ProjectToDoContainer visible={projectToDoVisible} project={props.project}
                                      openToDoForm={props.openToDoForm}/>
            </div>
        )
    }
}