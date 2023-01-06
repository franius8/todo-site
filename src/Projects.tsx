import React from "react";
import Header from "./Header";
import Project from "./Project";
import {ProjectInterface} from "./d";
import NewToDoForm from "./NewToDoForm";

export default function Projects(props: { projects: ProjectInterface[], newToDo: () => void, closeToDo: () => void, formVisible: boolean }) {
    if (props.projects.length > 0) {
        return (
            <>
                <Header active={"projects"} newTodo={props.newToDo}/>
                <div id={"projectdiv"}>
                    {props.projects.map((project) => <Project project={project}/>)}
                </div>
                <NewToDoForm formVisible={props.formVisible} close={props.closeToDo}/>
            </>
        );
    } else {
        return (
            <>
                <Header active={"projects"} newTodo={props.newToDo}/>
                <div id="projectdiv">
                    <div id="actiondiv">
                        No Projects yet. Time to <span id="addnew">add a new one</span>.
                    </div>
                </div>
                <NewToDoForm formVisible={props.formVisible} close={props.closeToDo}/>
            </>
        );
    }
}