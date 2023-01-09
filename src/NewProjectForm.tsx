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
import {ProjectInterface} from "./Modules/d";
import database from "./Modules/database";
import { setProjects } from "./Redux/contentSlice";

export default function NewProjectForm() {
    const [projectName, setProjectName] = React.useState("");
    const [projectDate, setProjectDate] = React.useState(DateConverter.convertToInputFormat(new Date()));
    const [priority, setPriority] = React.useState("");

    const priorities = ["Normal", "Urgent"];

    const projectFormVisible = useSelector((state: { modal: {projectFormVisible: boolean} }) => state.modal.projectFormVisible);
    const projects = useSelector(( state: {content: { projectList: ProjectInterface[] } }) => state.content.projectList);
    const dispatch = useDispatch();

    const handdleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProjectName(event.target.value);
    }
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProjectDate(DateConverter.convertToInputFormat(new Date(event.target.value)));
    }
    const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriority(event.target.value);
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const projectsCopy = [...projects];
        const iD = idGenerator.generateID();
        projectsCopy.push(projectobject(iD, projectName, [], projectDate, priority));
        database.updateDatabase(projectsCopy, "projects");
        setProjects(projectsCopy);
        dispatch(toggleProjectForm());
    }

    if (projectFormVisible) {
        return (
            <StandardForm close={() => dispatch(toggleProjectForm())} heading={"Add a new project"} onSubmit={handleSubmit} submitText={"Add"} id={"projectformdiv"}>
                <>
                    <TextInputElement name={"projectname"} value={projectName} heading={"Name:"} handleChange={handdleNameChange} required={true}/>
                    <DateInputElement name={"projectdate"} value={projectDate} heading={"Due date:"} handleChange={handleDateChange} required={true}/>
                    <RadioInputElement name={"projectpriority"} values={priorities} heading={"Priority"} handleChange={handlePriorityChange}/>
                </>
            </StandardForm>
        );
    } else {
        return null;
    }
}