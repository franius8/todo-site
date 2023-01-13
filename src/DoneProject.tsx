import React, { useState, useEffect } from "react";
import dateConverter from "./Modules/DateConverter";
import ProjectToDoContainer from "./ProjectToDoContainer";
import {ProjectInterface} from "./Modules/d";
import styled from "styled-components";

const ProjectContentForm = styled.form`
    display: flex;
    gap: 1rem;
`

export default function DoneProject(props: { project: ProjectInterface,
    openToDoForm: (project: ProjectInterface) => void,
    modifyProject: (project: ProjectInterface) => void,
    deleteProject: (project: ProjectInterface) => void}) {
    const [name, setName] = useState(props.project.name)
    const [date, setDate] = useState(props.project.name)
    const [projectToDoVisible, setProjectToDoVisible] = useState(false);
    const [duringEdit, setDuringEdit] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.name)

    const toggleEdit = () => setDuringEdit(!duringEdit)

    const handleDeleteProject = () => {

    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        props.modifyProject(props.project)
        setDuringEdit(false)
    }

    const toggleToDos = () => setProjectToDoVisible(!projectToDoVisible)


    if (!duringEdit) {
        return (
            <div className="projectcontainer">
                <div className={"doneproject"}>
                    <div className="labelstripe" style={{backgroundColor: "grey"}}></div>
                    <div className="middlediv">
                        <div className="checkboxdiv">
                            <div className="checkbox">
                                <span className="material-symbols-outlined">arrow_back</span>
                            </div>
                        </div>
                        <div className="projectcontent">
                            <div className="projectname">{name}</div>
                            <div className="tododate">
                                <div><span className="material-symbols-outlined">calendar_month</span></div>
                                <div>{date}</div>
                            </div>
                            <div className="todopriority">
                                <div className="prioritycircle" style={{backgroundColor: "gray"}}></div>
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
                    <div className="labelstripe" style={{backgroundColor: "gray"}}></div>
                    <div className="middlediv">
                        <div className="checkboxdiv">
                            <div className="checkbox">✓</div>
                        </div>
                        <div>
                            <ProjectContentForm id="editform" onSubmit={handleSubmit}>
                                <div className="inputdiv">
                                    <label htmlFor="projectnameedit">Name:</label>
                                    <input type="text" name="projectnameedit" id="projectnameedit" required={true}
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