import React from "react";
import DateConverter from "./Modules/DateConverter";
import StandardForm from "./FormComponents/StandardForm";
import TextInputElement from "./FormComponents/TextInputElement";
import DateInputElement from "./FormComponents/DateInputElement";
import RadioInputElement from "./FormComponents/RadioInputElement";
import { useSelector, useDispatch } from "react-redux";
import { toggleProjectForm } from "./Redux/modalSlice";
import idGenerator from "./Modules/idGenerator";
import projectobject from "./Modules/projectobject";
import { ProjectInterface } from "./Modules/d";
import {addProject, setProjects} from "./Redux/contentSlice";

export default function NewProjectForm() {
    const dispatch = useDispatch();

    const [projectName, setProjectName] = React.useState("");
    const [projectDate, setProjectDate] = React.useState(DateConverter.convertToInputFormat(new Date()));
    const [priority, setPriority] = React.useState("");

    const projectFormVisible = useSelector((state: { modal: {projectFormVisible: boolean} }) => state.modal.projectFormVisible);

    const priorities = ["Normal", "Urgent"];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "projectname":
                setProjectName(e.target.value);
                break;
            case "projectdate":
                setProjectDate(e.target.value);
                break;
            case "projectpriority":
                setPriority(e.target.value);
                break;
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const iD = idGenerator.generateID();
        dispatch(addProject(projectobject(iD, projectName, [], projectDate, priority)));
        dispatch(toggleProjectForm());
    }

    if (projectFormVisible) {
        return (
            <StandardForm close={() => dispatch(toggleProjectForm())} heading={"Add a new project"} onSubmit={handleSubmit} submitText={"Add"} id={"projectformdiv"}>
                <>
                    <TextInputElement name={"projectname"} value={projectName} heading={"Name:"} handleChange={handleInputChange} required/>
                    <DateInputElement name={"projectdate"} value={projectDate} heading={"Due date:"} handleChange={handleInputChange} required/>
                    <RadioInputElement name={"projectpriority"} values={priorities} heading={"Priority"} handleChange={handleInputChange}/>
                </>
            </StandardForm>
        );
    } else {
        return null;
    }
}