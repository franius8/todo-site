import React, {useEffect, useState} from "react";
import {ProjectInterface, ToDoInterface} from "./Modules/d";
import StandardForm from "./FormComponents/StandardForm";
import "./stylesheets/ProjectToDoForm.css"
import { useSelector, useDispatch } from "react-redux";
import { toggleProjectToDoForm } from "./Redux/modalSlice";
import database from "./Modules/database";
import {setProjects, setToDos} from "./Redux/contentSlice";

export default function ProjectToDoForm(props: { project: ProjectInterface | null } ) {
    const toDoFormVisible = useSelector((state: { modal: {projectToDoFormVisible: boolean} }) => state.modal.projectToDoFormVisible);
    const toDos = useSelector((state: {content: {toDos: ToDoInterface[]}}) => state.content.toDos);
    const projects = useSelector((state: {content: {projectList: ProjectInterface[]}}) => state.content.projectList);
    const dispatch = useDispatch();

    const [checkedState, setCheckedState] = useState<boolean[]>( [] );

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
        console.log(checkedState);
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (props.project) {
            e.preventDefault();
            let toDosCopy = [...toDos];
            let projectsCopy = [...projects];
            let newToDos: ToDoInterface[] = [];
            // @ts-ignore
            const projectCopy = { ...projectsCopy.filter((project) => project.iD === props.project.iD)[0] };
            if (projectCopy) {
                const toDosAry: ToDoInterface[] = [];
                console.log(checkedState);
                checkedState.forEach((checked, index) => {
                    if (checked) {
                        toDosAry.push(toDos[index]);
                        const toDoCopy: ToDoInterface = { ...toDosCopy[index],
                            projectiDs: [...toDosCopy[index].projectiDs, projectCopy.iD] };
                        toDosCopy = toDosCopy.filter((toDo) => toDo.iD !== toDoCopy.iD);
                        newToDos.push(toDoCopy);
                    } else if (toDosCopy[index].projectiDs.includes(projectCopy.iD)) {
                        const toDoCopy: ToDoInterface = { ...toDosCopy[index], projectiDs:
                                toDosCopy[index].projectiDs.filter((projectID) => projectID !== projectCopy.iD) };
                        toDosCopy = toDosCopy.filter((toDo) => toDo.iD !== toDoCopy.iD);
                        newToDos.push(toDoCopy);
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