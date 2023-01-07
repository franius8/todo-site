import React, {Dispatch, SetStateAction} from "react";
import Header from "./Header";
import Project from "./Project";
import {ProjectInterface} from "./d";
import NewToDoForm from "./NewToDoForm";
import NewProjectForm from "./NewProjectForm";

export default function Projects(props: { projects: ProjectInterface[], newToDo: () => void, closeToDo: () => void,
    formVisible: boolean, setContentClass: Dispatch<SetStateAction<string>>,
    createToDo: (heading: string, text: string, date: Date, priority: string) => void }) {

    const [projectFormVisible, setProjectFormVisible] = React.useState(false);
    const openProjectForm = () => {
        setProjectFormVisible(true);
        props.setContentClass("blurred");
    }
    const closeProjectForm = () => {
        setProjectFormVisible(false);
        props.setContentClass("");
    }
    if (props.projects.length > 0) {
        return (
            <>
                <Header active={"projects"} newTodo={props.newToDo}/>
                <div id={"projectdiv"}>
                    {props.projects.map((project) => <Project project={project}/>)}
                </div>
                <NewToDoForm formVisible={props.formVisible} close={props.closeToDo} newToDo={props.createToDo}/>
                <NewProjectForm formVisible={projectFormVisible} close={closeProjectForm}/>
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
                <NewProjectForm formVisible={projectFormVisible} close={closeProjectForm}/>
            </>
        );
    }
}