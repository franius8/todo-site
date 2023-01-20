import React, { useState } from "react";
import {ProjectInterface, ToDoInterface} from "./Modules/d";
import DoneProject from "./DoneProject";

// Component for displaying the done projects
export default function DoneProjects(props: { doneProjects: ProjectInterface[],
    openToDoForm: (project: ProjectInterface) => void,
    modifyProject: (iD: number, name: string, date: string, priority: string, toDosAry: ToDoInterface[]) => void,
    deleteProject: (projects: ProjectInterface) => void,
    revertProject: (project: ProjectInterface) => void}) {

    const [doneProjectsVisible, setDoneProjectsVisible] = useState(false);

    // Function for toggling the expand icon and visibility of the done projects
    const toggleVisibility = () => setDoneProjectsVisible(!doneProjectsVisible);

    return (
        <div id={"doneprojects"}>
            <div className={"cursor-pointer flex items-center justify-center font-bold"} onClick={toggleVisibility}>Done Projects
                <span className={`material-symbols-outlined ${doneProjectsVisible ? "" : "rotate"}`}>expand_more</span>
            </div>
            {doneProjectsVisible &&
                (props.doneProjects.length > 0 ?
                <div id={"doneprojectscontainer"} className={"p-4"}>
                {props.doneProjects.map((project) => <DoneProject key={project.iD} project={project} openToDoForm={props.openToDoForm}
                                                                  deleteProject={props.deleteProject} modifyProject={props.modifyProject} revertProject = {props.revertProject}/>)}
                </div> :
                <div id={"noprojects"} className={"p-4"}>No projects marked as done yet</div>)
            }
        </div>
    )
}