import React from "react";
import StandardForm from "./StandardForm";
import RadioElement from "./RadioElement";
import TextInputElement from "./TextInputElement";
import DateInputElement from "./DateInputElement";
import RadioInputElement from "./RadioInputElement";
import DateConverter from "./DateConverter";

export default function NewToDoForm(props: { formVisible: boolean, close: () => void, newToDo: (heading: string, text: string, date: Date, priority: string) => void }) {
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [dueDate, setDueDate] = React.useState(DateConverter.convertToInputFormat(new Date()));
    const [priority, setPriority] = React.useState("Normal");

    const priorities = ["Low", "Standard", "High"];

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }
    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }
    const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(DateConverter.convertToInputFormat(new Date(e.target.value)));
    }
    const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPriority(e.target.value);
        console.log(e.target.value);
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.newToDo(title, content, new Date(dueDate), priority);
        props.close();
    }

    if (props.formVisible) {
        return (
           <StandardForm close={props.close} heading={"Add a new ToDo"} onSubmit={handleSubmit} submitText={"Add"} id={"formdiv"}>
               <>
                   <TextInputElement name={"todotitle"} heading={"Title"} value={title} handleChange={handleTitleChange} required={true}/>
                   <TextInputElement name={"todocontent"} value={content} heading={"Content (optional)"} handleChange={handleContentChange} required={false}/>
                   <DateInputElement name={"tododate"} value={dueDate} heading={"Due date:"} handleChange={handleDueDateChange} required={true}/>
                   <RadioInputElement name={"todopriority"} values={priorities} heading={"Priority"} handleChange={handlePriorityChange} />
               </>
           </StandardForm>
        )
    } else {
        return null;
    }
}