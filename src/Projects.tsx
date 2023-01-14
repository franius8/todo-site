import React, { useState } from "react";
import Header from "./Header";
import Project from "./Project";
import DoneProjects from "./DoneProjects";
import ProjectToDoForm from "./ProjectToDoForm";
import { ProjectInterface, ToDoInterface, StateInterface } from "./Modules/d";
import { useSelector, useDispatch } from "react-redux";
import { toggleProjectForm, toggleProjectToDoForm } from "./Redux/modalSlice";
import {addDoneProject, addProject, setDoneList, setDoneProjects, setProjects, setToDos} from "./Redux/contentSlice";


// Component for the Projects page
export default function Projects() {

    const dispatch = useDispatch();
    const toDoList = useSelector((state: StateInterface) => state.content.toDos);
    const doneToDos = useSelector((state: StateInterface) => state.content.doneList);
    const projects = useSelector((state: StateInterface) => state.content.projectList);
    const doneProjects = useSelector((state: StateInterface) => state.content.doneProjectList);

    const [projectToDosEdited, setProjectToDosEdited] = useState<ProjectInterface | null>(null);

    // Function to open the modal for adding a new project
    const openProjectToDoForm = (project: ProjectInterface) => {
        setProjectToDosEdited(project);
        dispatch(toggleProjectToDoForm());
    }


    // Function modifying a single project's data
    const modifyProject = (iD: number, name: string, date: string, priority: string, toDosAry: ToDoInterface[]) => {
        const projectsCopy = [...projects].filter(x => x.iD !== iD);
        const project: ProjectInterface = {iD, name, date, priority, toDosAry};
        projectsCopy.push(project);
        dispatch(setProjects(projectsCopy));
    }

    // Function modifying a single done project's data
    const modifyDoneProject = (iD: number, name: string, date: string, priority: string, toDosAry: ToDoInterface[]) => {
        const doneProjectsCopy = [...doneProjects].filter(x => x.iD !== iD);
        const project: ProjectInterface = {iD, name, date, priority, toDosAry};
        doneProjectsCopy.push(project);
        dispatch(setDoneProjects(doneProjectsCopy));
    }

    // Function reverting a done project to the projects list
    const revertProject = (project: ProjectInterface) => {
        const doneProjectsCopy = [...doneProjects].filter(x => x.iD !== project.iD);
        dispatch(setDoneProjects(doneProjectsCopy));
        dispatch(addProject(project));
    }

    // Function deleting a single project
    const deleteProject = ( { iD }: ProjectInterface) => {
        if (confirm('Are you sure you want to delete that?\nThis is an irreversible operation\nProject ToDos will be deleted as well.')) {
            const projectsCopy = [...projects];
            const toDosCopy = [...toDoList];
            const newProjectsCopy = projectsCopy.filter(x => x.iD !== iD);
            const newToDosCopy = toDosCopy.filter(x => !x.projectiDs.includes(iD));
            dispatch(setProjects(newProjectsCopy));
            dispatch(setToDos(newToDosCopy));
        }
    }

    // Function deleting a single done project
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

    // Function moving a single project to the done projects list
    const moveToDone = (project: ProjectInterface) => {
        const projectsCopy = [...projects].filter(x => x.iD !== project.iD);
        dispatch(addDoneProject(project));
        dispatch(setProjects(projectsCopy));
    }

    if (projects.length > 0 || doneProjects.length > 0) {
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
                        deleteProject={deleteDoneProject} revertProject={revertProject}/>
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
                        No Projects yet. Time to <span id="addnew" onClick={() => dispatch(toggleProjectForm())}
                                                       role="button">add a new one</span>.
                    </div>
                </div>
            </>
        );
    }
}