import React, {useEffect, useState} from "react";
import {ProjectInterface, ToDoInterface} from "./Modules/d";
import StandardForm from "./FormComponents/StandardForm";
import "./stylesheets/ProjectToDoForm.css"
import { useSelector, useDispatch } from "react-redux";
import { toggleProjectToDoForm } from "./Redux/modalSlice";
import database from "./Modules/database";

export default function ProjectToDoForm() {
    const toDoFormVisible = useSelector((state: { modal: {projectToDoFormVisible: boolean} }) => state.modal.projectToDoFormVisible);
    const toDos = useSelector((state: {content: {toDos: ToDoInterface[]}}) => state.content.toDos);
    const projects = useSelector((state: {content: {projectList: ProjectInterface[]}}) => state.content.projectList);
    const dispatch = useDispatch();
    const editedProjectID = +useSelector((state: {modal: {editedProjectID: string}}) => state.modal.editedProjectID);
    const project = projects.find((project) => project.iD === editedProjectID);

    const [checkedState, setCheckedState] = useState<boolean[]>( [] );
    const [currEditedId, setCurrEditedId] = useState(0);

    useEffect(() => {
        if (project) {
            console.log("aaa")
            const checkedStateAry: boolean[] = new Array(toDos.length).fill(false);
            project.toDosAry.forEach((projectToDo) => {
                const index = toDos.findIndex((toDo) => toDo.iD == projectToDo.iD);
                checkedStateAry[index] = true;

            });
            setCheckedState(checkedStateAry);
            console.log(checkedStateAry);
        }
        console.log("aaa")
    }, []);


    const handleChange = (position: number) => {
        console.log(checkedState);
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const toDosCopy = [...toDos];
        const projectsCopy = [...projects];
        const projectCopy = projectsCopy.find((project) => project.iD === currEditedId);
        if (projectCopy) {
            const toDosAry: ToDoInterface[] = [];
            checkedState.forEach((checked, index) => {
                if (checked) {
                    toDosAry.push(toDos[index]);
                    toDosCopy[index].projectiDs.push(projectCopy.iD);
                }
            });
            projectCopy.toDosAry = toDosAry;
        }
        database.updateDatabase(toDosCopy, "todos");
        database.updateDatabase(projectsCopy, "projects");
        close();
    }

    if (toDoFormVisible) {
        return (
            <StandardForm close={() => dispatch(toggleProjectToDoForm(0))} heading={"Add new ToDos to Project"} onSubmit={onSubmit} submitText={"Add"} id={"projecttodosformdiv"}>
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