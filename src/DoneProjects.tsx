import React, { useState } from "react";
import styled from "styled-components";
import { ProjectInterface } from "./Modules/d";
import DoneProject from "./DoneProject";

const Header = styled.h2`
  display: flex;
  align-content: center;
`

export default function DoneProjects(props: { doneProjects: ProjectInterface[],
    openToDoForm: (project: ProjectInterface) => void,
    modifyProject: (project: ProjectInterface) => void,
    deleteProject: (projects: ProjectInterface) => void}) {

    const [icon, setIcon] = useState(false);

    const toggleIcon = () => setIcon(!icon);

    return (
        <div id={"doneprojects"}>
            <Header onClick={toggleIcon}>Done Projects
                <span className={`material-symbols-outlined ${icon ? "rotate" : ""}`}>expand_more</span>
            </Header>
            <div id={"doneprojectscontainer"}>
                {props.doneProjects.map((project) => <DoneProject key={project.iD} project={project} openToDoForm={props.openToDoForm}
                                                    deleteProject={props.deleteProject} modifyProject={props.modifyProject}/>)}
            </div>
        </div>
    )
}