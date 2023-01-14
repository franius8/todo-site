import React, { useState } from "react";
import styled from "styled-components";
import { ProjectInterface } from "./Modules/d";
import DoneProject from "./DoneProject";

const Header = styled.h2`
  display: flex;
  align-content: center;
  justify-content: center;
  cursor: pointer;
`

export default function DoneProjects(props: { doneProjects: ProjectInterface[],
    openToDoForm: (project: ProjectInterface) => void,
    modifyProject: (project: ProjectInterface) => void,
    deleteProject: (projects: ProjectInterface) => void,
    revertProject: (project: ProjectInterface) => void}) {

    const [doneProjectsVisible, setDoneProjectsVisible] = useState(false);

    const toggleIcon = () => setDoneProjectsVisible(!doneProjectsVisible);

    return (
        <div id={"doneprojects"}>
            <Header onClick={toggleIcon}>Done Projects
                <span className={`material-symbols-outlined ${doneProjectsVisible ? "" : "rotate"}`}>expand_more</span>
            </Header>
            {doneProjectsVisible &&
                <div id={"doneprojectscontainer"}>
                {props.doneProjects.map((project) => <DoneProject key={project.iD} project={project} openToDoForm={props.openToDoForm}
                                                    deleteProject={props.deleteProject} modifyProject={props.modifyProject}
                                                    revertProject = {props.revertProject}/>)}
            </div>}
        </div>
    )
}