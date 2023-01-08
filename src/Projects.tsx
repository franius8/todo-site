import React, {Dispatch, SetStateAction} from "react";
import Header from "./Header";
import Project from "./Project";
import {ProjectInterface, ToDoInterface} from "./d";
import NewToDoForm from "./NewToDoForm";
import NewProjectForm from "./NewProjectForm";
import ProjectToDoForm from "./ProjectToDoForm";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "./firebase";
import {collection, doc, updateDoc} from "firebase/firestore";

export default function Projects(props: { projects: ProjectInterface[], newToDo: () => void, closeToDo: () => void,
    formVisible: boolean, setContentClass: Dispatch<SetStateAction<string>>,
    createToDo: (heading: string, text: string, date: Date, priority: string) => void,
    createProject: (name: string, date: Date, priority: string) => void,
    toDos: ToDoInterface[]}) {

    const [projectFormVisible, setProjectFormVisible] = React.useState(false);
    const [projectToDoFormVisible, setProjectToDoFormVisible] = React.useState(false);
    const [projectToDosEdited, setProjectToDosEdited] = React.useState<ProjectInterface | null>(null);

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
                alert("No user is currently signed in. ToDos are saved in local storage.");
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


    if (props.projects.length > 0) {
        return (
            <>
                <Header active={"projects"} newTodo={props.newToDo}/>
                <div id="newprojectbuttondiv">
                    <button id="newprojectbutton" onClick={openProjectForm}>Add a new project</button>
                </div>
                <div id={"projectdiv"}>
                    {props.projects.map((project) => <Project project={project} openToDoForm={openProjectToDoForm}/>)}
                </div>
                <NewToDoForm formVisible={props.formVisible} close={props.closeToDo} newToDo={props.createToDo}/>
                <NewProjectForm formVisible={projectFormVisible} close={closeProjectForm} createProject={props.createProject}/>
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
                        No Projects yet. Time to <span id="addnew" onClick={openProjectForm}>add a new one</span>.
                    </div>
                </div>
                <NewToDoForm formVisible={props.formVisible} close={props.closeToDo} newToDo={props.createToDo}/>
                <NewProjectForm formVisible={projectToDoFormVisible} close={closeProjectForm} createProject={props.createProject}/>
            </>
        );
    }
}