import React, {useEffect, useState} from "react";
import {ProjectInterface, ToDoInterface} from "./d";
import DateConverter from "./DateConverter";
import "./stylesheets/ProjectToDoForm.css"

export default function ProjectToDoForm({close, databaseUpdate, project, toDos, visible}: {
    visible: boolean, close: () => void, toDos: ToDoInterface[],
    project: ProjectInterface | null, databaseUpdate: () => void
}) {
    const [checkedState, setCheckedState] = useState( new Array(toDos.length).fill(false) );

    useEffect(() => {
        if (project) {
            let checkedStateAry = new Array(toDos.length).fill(false);
            project.toDosAry.forEach((projectToDo) => {
                let index = toDos.findIndex((toDo) => toDo.iD == projectToDo.iD);
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
            let toDosAry: ToDoInterface[] = [];
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
            <div id="projecttodosformdiv" style={{display: "block"}}>
                <div id="closebuttondiv">
                    <button id="closebutton" onClick={close}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <h2 className="formheading">Add new ToDos to Project</h2>
                <form onSubmit={onSubmit}>
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
                    <button type="submit" id="todosubmit">Add</button>
                </form>
            </div>
        )
    } else {
        return null;
    }
}