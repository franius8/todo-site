import React, {useEffect, useState} from "react";
import {ProjectInterface, ToDoInterface} from "./Modules/d";
import DateConverter from "./Modules/DateConverter";
import StandardForm from "./FormComponents/StandardForm";
import "./stylesheets/ProjectToDoForm.css"

export default function ProjectToDoForm({close, databaseUpdate, project, toDos, visible}: {
    visible: boolean, close: () => void, toDos: ToDoInterface[],
    project: ProjectInterface | null, databaseUpdate: () => void
}) {
    const [checkedState, setCheckedState] = useState( new Array(toDos.length).fill(false) );

    useEffect(() => {
        if (project) {
            const checkedStateAry = new Array(toDos.length).fill(false);
            project.toDosAry.forEach((projectToDo) => {
                const index = toDos.findIndex((toDo) => toDo.iD == projectToDo.iD);
                checkedStateAry[index] = true;
            });
            setCheckedState(checkedStateAry);
        }
    }, [project, toDos]);


    const handleChange = (position: number) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (project) {
            const toDosAry: ToDoInterface[] = [];
            checkedState.forEach((checked, index) => {
                if (checked) {
                    toDosAry.push(toDos[index]);
                    toDos[index].projectiDs.push(project.iD);
                }
            });
            project.toDosAry = toDosAry;
        }
        databaseUpdate();
        close();
    }

    console.log(project);
    if (visible) {
        return (
            <StandardForm close={close} heading={"Add new ToDos to Project"} onSubmit={onSubmit} submitText={"Add"} id={"projecttodosformdiv"}>
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
                                            {DateConverter.convertToString(date)}
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