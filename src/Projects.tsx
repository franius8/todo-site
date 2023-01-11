import React, { useState } from "react";
import Header from "./Header";
import Project from "./Project";
import { ProjectInterface, ToDoInterface } from "./Modules/d";
import ProjectToDoForm from "./ProjectToDoForm";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Modules/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import {openModal, toggleProjectForm, toggleProjectToDoForm} from "./Redux/modalSlice";
import database from "./Modules/database";
import { setProjects, setToDos } from "./Redux/contentSlice";

export default function Projects(props: { projects: ProjectInterface[]
    createToDo: (heading: string, text: string, date: string, priority: string) => void,
    createProject: (name: string, date: string, priority: string) => void,
    toDos: ToDoInterface[]}) {

    const dispatch = useDispatch();
    const projects = useSelector((state: { content: {projectList: ProjectInterface[]} }) => state.content.projectList);

    const [projectToDosEdited, setProjectToDosEdited] = useState<ProjectInterface | null>(null);

    const updateDatabase = async (projectsCopy: ProjectInterface[], toDosCopy: ToDoInterface[]) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                try {
                    const docRef = await updateDoc(doc(collection(db, "users"), uid), {
                        projects: JSON.stringify(projectsCopy),
                        todos: JSON.stringify(toDosCopy)
                    });
                } catch (e) {
                }
            } else {
                dispatch(openModal("No user is currently signed in. ToDos are saved in local storage."));
                localStorage.setItem("projectsary", (JSON.stringify(projectsCopy)));
                localStorage.setItem("todoary", (JSON.stringify(toDosCopy)));
            }
        });
    }

    const openProjectToDoForm = (project: ProjectInterface) => {
        setProjectToDosEdited(project);
        dispatch(toggleProjectToDoForm());
    }

    const modifyProject = (iD: number, name: string, date: string, priority: string) => {
        const projectsCopy = [...props.projects];
        projectsCopy.forEach((project) => {
            if (project.iD === iD) {
                project.name = name;
                project.date = date;
                project.priority = priority;
            }
        });
        const toDosCopy = [...props.toDos];
        updateDatabase(projectsCopy, toDosCopy);
    }

    const deleteProject = (project: ProjectInterface) => {
        if (confirm('Are you sure you want to delete that?\nThis is an irreversible operation\nProject ToDos will be deleted as well.')) {
            const projectsCopy = [...props.projects];
            const toDosCopy = [...props.toDos];
            const projectToDos = project.toDosAry;
            const newProjectsCopy = projectsCopy.filter(x => x.iD !== project.iD);
            const newToDosCopy = toDosCopy.filter(x => !x.projectiDs.includes(project.iD));
            dispatch(setProjects(newProjectsCopy));
            dispatch(setToDos(toDosCopy));
            database.updateDatabase(newProjectsCopy, "projects");
            database.updateDatabase(newToDosCopy, "todos");
        }
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
                    deleteProject={deleteProject} modifyProject={modifyProject}/>)}
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