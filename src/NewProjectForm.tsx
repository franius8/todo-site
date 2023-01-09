import { motion } from "framer-motion";
import React from "react";
import DateConverter from "./DateConverter";
import StandardForm from "./StandardForm";
import TextInputElement from "./TextInputElement";
import DateInputElement from "./DateInputElement";
import RadioInputElement from "./RadioInputElement";

export default function NewProjectForm(props: { formVisible: boolean, close: () => void,
    createProject: (name: string, date: Date, priority: string) => void }) {
    const [projectName, setProjectName] = React.useState("");
    const [projectDate, setProjectDate] = React.useState(DateConverter.convertToInputFormat(new Date()));
    const [priority, setPriority] = React.useState("");

    const priorities = ["Normal", "Urgent"];

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
        props.createProject(projectName, new Date(projectDate), priority);
        props.close();
    }

    const entryExitAnimation = {
        initial: { opacity: 0, top: "-50%", transition: { type: "tween", duration: 2 } },
        isOpen: { opacity: 1, top: "50%" },
        exit: { opacity: 0, top: "-50%" }
    };

    if (props.formVisible) {
        return (
            <StandardForm close={props.close} heading={"Add a new project"} onSubmit={handleSubmit} submitText={"Add"} id={"projectformdiv"}>
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