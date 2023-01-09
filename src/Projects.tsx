import React, {Dispatch, SetStateAction, useState} from "react";
import Header from "./Header";
import Project from "./Project";
import {ProjectInterface, ToDoInterface} from "./Modules/d";
import NewProjectForm from "./NewProjectForm";
import ProjectToDoForm from "./ProjectToDoForm";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "./Modules/firebase";
import {collection, doc, updateDoc} from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import {openModal, toggleProjectForm} from "./Redux/modalSlice";

export default function Projects(props: { projects: ProjectInterface[], newToDo: () => void, closeToDo: () => void,
    formVisible: boolean, setContentClass: Dispatch<SetStateAction<string>>,
    createToDo: (heading: string, text: string, date: Date, priority: string) => void,
    createProject: (name: string, date: Date, priority: string) => void,
    toDos: ToDoInterface[]}) {

    const dispatch = useDispatch();

    const [projectFormVisible, setProjectFormVisible] = useState(false);
    const [projectToDoFormVisible, setProjectToDoFormVisible] = useState(false);
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

    const openProjectForm = () => {
        setProjectFormVisible(true);
        props.setContentClass("blurred");
    }
    const closeProjectForm = () => {
        setProjectFormVisible(false);
        props.setContentClass("");
    }

    const openProjectToDoForm = (project: ProjectInterface) => {
        props.setContentClass("blurred");
        setProjectToDoFormVisible(true);
        setProjectToDosEdited(project);
    }
    const closeProjectToDoForm = () => {
        props.setContentClass("");
        setProjectToDoFormVisible(false);
        setProjectToDosEdited(null);
    }

    const handleToDoUpdate = () => {
        const projectsCopy = [...props.projects];
        const toDosCopy = [...props.toDos];
        console.log(projectsCopy);
        updateDatabase(projectsCopy, toDosCopy);
    }

    const modifyProject = (iD: number, name: string, date: Date, priority: string) => {
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
            updateDatabase(newProjectsCopy, newToDosCopy);
        }
    }

    if (props.projects.length > 0) {
        return (
            <>
                <Header active={"projects"} newTodo={props.newToDo}/>
                <div id="newprojectbuttondiv">
                    <button id="newprojectbutton" onClick={() => dispatch(toggleProjectForm())}>Add a new project</button>
                </div>
                <div id={"projectdiv"}>
                    {props.projects.map((project) => <Project key={project.iD} project={project} openToDoForm={openProjectToDoForm}
                    deleteProject={deleteProject} modifyProject={modifyProject}/>)}
                </div>
                <ProjectToDoForm visible={projectToDoFormVisible} toDos={props.toDos} close={closeProjectToDoForm}
                                 project={projectToDosEdited} databaseUpdate={handleToDoUpdate}/>
            </>
        );
    } else {
        return (
            <>
                <Header active={"projects"} newTodo={props.newToDo}/>
                <div id="projectdiv">
                    <div id="actiondiv">
                        No Projects yet. Time to <span id="addnew" onClick={() => dispatch(toggleProjectForm())}>add a new one</span>.
                    </div>
                </div>
            </>
        );
    }
}