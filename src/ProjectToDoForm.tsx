import React, {useEffect, useState} from "react";
import {ProjectInterface, ToDoInterface} from "./Modules/d";
import StandardForm from "./FormComponents/StandardForm";
import "./stylesheets/ProjectToDoForm.css"
import { useSelector, useDispatch } from "react-redux";
import { toggleProjectToDoForm } from "./Redux/modalSlice";
import database from "./Modules/database";
import {setProjects, setToDos} from "./Redux/contentSlice";
import {To} from "react-router-dom";

export default function ProjectToDoForm(props: { project: ProjectInterface | null } ) {
    const dispatch = useDispatch();

    const toDoFormVisible = useSelector((state: { modal: {projectToDoFormVisible: boolean} }) => state.modal.projectToDoFormVisible);
    const toDos = useSelector((state: {content: {toDos: ToDoInterface[]}}) => state.content.toDos);
    const projects = useSelector((state: {content: {projectList: ProjectInterface[]}}) => state.content.projectList);

    const [checkedState, setCheckedState] = useState<boolean[]>( new Array(toDos.length).fill(false) );

    useEffect(() => {
        if (props.project) {
            const checkedStateAry = new Array(toDos.length).fill(false);
            props.project.toDosAry.forEach((projectToDo) => {
                const index = toDos.findIndex((toDo) => toDo.iD == projectToDo.iD);
                checkedStateAry[index] = true;
            });
            setCheckedState(checkedStateAry);
            console.log(checkedStateAry);
        }
    }, [props.project, toDos]);

    const handleChange = (position: number) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (props.project) {
            e.preventDefault();
            const toDosCopy = [...toDos];
            const newToDos: ToDoInterface[] = [];
            let projectsCopy = [...projects];
            // @ts-ignore
            const projectCopy = { ...projectsCopy.filter((project) => project.iD === props.project.iD)[0] };
            if (projectCopy) {
                const toDosAry: ToDoInterface[] = [];
                checkedState.forEach((checked, index) => {
                    const currentToDo = toDosCopy.shift() as ToDoInterface;
                    if (checked) {
                        toDosAry.push(currentToDo);
                        const toDoCopy: ToDoInterface = { ...currentToDo, projectiDs: [...currentToDo.projectiDs, projectCopy.iD] };
                        newToDos.push(toDoCopy);
                    } else if (currentToDo.projectiDs.includes(projectCopy.iD)) {
                        console.log(currentToDo)
                        const toDoCopy: ToDoInterface = { ...currentToDo, projectiDs:
                                currentToDo.projectiDs.filter((projectID) => projectID !== projectCopy.iD) };
                        console.log (toDoCopy);
                        newToDos.push(toDoCopy);
                    } else {
                        newToDos.push(currentToDo);
                    }
                });
                projectCopy.toDosAry = toDosAry;
            }
            // @ts-ignore
            projectsCopy = projectsCopy.filter((project) => project.iD !== props.project.iD);
            database.updateDatabase([...toDosCopy, ...newToDos], "todos");
            database.updateDatabase([...projectsCopy, projectCopy], "projects");
            dispatch(setProjects([...projectsCopy, projectCopy]));
            dispatch(setToDos([...toDosCopy, ...newToDos]));
            dispatch(toggleProjectToDoForm());
        }
    }

    if (toDoFormVisible) {
        return (
            <StandardForm close={() => dispatch(toggleProjectToDoForm())} heading={"Add new ToDos to Project"} onSubmit={onSubmit} submitText={"Add"} id={"projecttodosformdiv"}>
                <div className="inputdiv"><label htmlFor="projectcheckboxdiv">Select ToDos:</label>
                    <div className="projectcheckboxdiv">
                        {toDos.map(({ iD, heading, date}, index) => {
                            return (
                                <div className="projectcheckbox" key={index}>
                                    <input type="checkbox" name="projectcheckbox" id={iD.toString()} value={heading}
                                           checked={checkedState[index]} onChange={() => handleChange(index)}/>
                                    <label htmlFor={iD.toString()}>
                                        <div>{heading}</div>
                                        <div className="formtododate">
                                            <span className="material-symbols-outlined">calendar_month</span>
                                            {date}
                                        </div>
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </StandardForm>
        )
    } else {
        return null;
    }
}