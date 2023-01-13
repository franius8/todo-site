import React, { useState } from "react";
import Header from "./Header";
import Project from "./Project";
import DoneProjects from "./DoneProjects";
import ProjectToDoForm from "./ProjectToDoForm";
import { ProjectInterface, ToDoInterface } from "./Modules/d";
import { useSelector, useDispatch } from "react-redux";
import { toggleProjectForm, toggleProjectToDoForm } from "./Redux/modalSlice";
import {addDoneProject, setDoneList, setDoneProjects, setProjects, setToDos} from "./Redux/contentSlice";

export default function Projects(props: { toDos: ToDoInterface[]}) {

    const dispatch = useDispatch();
    const doneToDos = useSelector((state: { content: {doneList: ToDoInterface[]} }) => state.content.doneList);
    const projects = useSelector((state: { content: {projectList: ProjectInterface[]} }) => state.content.projectList);
    const doneProjects = useSelector((state: { content: {doneProjects: ProjectInterface[]} }) => state.content.doneProjects);

    const [projectToDosEdited, setProjectToDosEdited] = useState<ProjectInterface | null>(null);

    const openProjectToDoForm = (project: ProjectInterface) => {
        setProjectToDosEdited(project);
        dispatch(toggleProjectToDoForm());
    }

    const modifyProject = (iD: number, name: string, date: string, priority: string) => {
        const projectsCopy = [...projects];
        projectsCopy.forEach((project) => {
            if (project.iD === iD) {
                project.name = name;
                project.date = date;
                project.priority = priority;
            }
        });
        dispatch(setProjects(projectsCopy));
    }

    const modifyDoneProject = ( {iD, name, date, priority}: ProjectInterface ) => {
        const doneProjectsCopy = [...doneProjects];
        doneProjectsCopy.forEach((project) => {
            if (project.iD === iD) {
                project.name = name;
                project.date = date;
                project.priority = priority;
            }
        });
        dispatch(setProjects(doneProjectsCopy));
    }

    const deleteProject = ( { iD }: ProjectInterface) => {
        if (confirm('Are you sure you want to delete that?\nThis is an irreversible operation\nProject ToDos will be deleted as well.')) {
            const projectsCopy = [...projects];
            const toDosCopy = [...props.toDos];
            const newProjectsCopy = projectsCopy.filter(x => x.iD !== iD);
            const newToDosCopy = toDosCopy.filter(x => !x.projectiDs.includes(iD));
            dispatch(setProjects(newProjectsCopy));
            dispatch(setToDos(newToDosCopy));
        }
    }

    const deleteDoneProject = ( { iD }: ProjectInterface) => {
        if (confirm('Are you sure you want to delete that?\nThis is an irreversible operation\nProject ToDos will be deleted as well.')) {
            const doneProjectsCopy = [...doneProjects]
            const doneToDosCopy = [...doneToDos]
            const newDoneProjectsCopy = doneProjectsCopy.filter(x => x.iD !== iD)
            const newDoneToDosCopy = doneToDosCopy.filter(x => !x.projectiDs.includes(iD))
            dispatch(setDoneProjects(newDoneProjectsCopy))
            dispatch(setDoneList(newDoneToDosCopy))
        }
    }

    const moveToDone = (project: ProjectInterface) => {
        const projectsCopy = [...projects].filter(x => x.iD !== project.iD);
        project.priority = "Done";
        dispatch(addDoneProject(project));
        dispatch(setProjects(projectsCopy));
    }

    if (projects.length > 0) {
        return (
            <>
                <Header active={"projects"}/>
                <div id="newprojectbuttondiv">
                    <button id="newprojectbutton" onClick={() => dispatch(toggleProjectForm())}>Add a new project</button>
                </div>
                <div id={"projectdiv"}>
                    {projects.map((project) => <Project key={project.iD} project={project} openToDoForm={openProjectToDoForm}
                    deleteProject={deleteProject} modifyProject={modifyProject} moveToDone={moveToDone}/>)}
                    <DoneProjects doneProjects={doneProjects} openToDoForm={openProjectToDoForm} modifyProject={modifyDoneProject}
                        deleteProject={deleteDoneProject}/>
                </div>
                <ProjectToDoForm project={projectToDosEdited} />
            </>
        );
    } else {
        return (
            <>
                <Header active={"projects"}/>
                <div id="projectdiv">
                    <div id="actiondiv">
                        No Projects yet. Time to <span id="addnew" onClick={() => dispatch(toggleProjectForm())}>add a new one</span>.
                    </div>
                </div>
            </>
        );
    }
}