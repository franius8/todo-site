import React from "react";
import StandardForm from "./FormComponents/StandardForm";
import TextInputElement from "./FormComponents/TextInputElement";
import DateInputElement from "./FormComponents/DateInputElement";
import RadioInputElement from "./FormComponents/RadioInputElement";
import DateConverter from "./Modules/DateConverter";
import { useSelector, useDispatch } from "react-redux";
import { openModal, toggleToDoForm } from "./Redux/modalSlice";
import { addToDo } from "./Redux/contentSlice";
import idGenerator from "./Modules/idGenerator";
import { ToDoInterface } from "./Modules/d";
import todoObject from "./Modules/todoObject";
import { auth } from "./Modules/firebase";
import database from "./Modules/database";

export default function NewToDoForm() {
    const dispatch = useDispatch();

    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [dueDate, setDueDate] = React.useState<string>(DateConverter.convertToInputFormat(new Date()));
    const [priority, setPriority] = React.useState("Normal");

    const todoFormVisible = useSelector((state: { modal: {toDoFormVisible: boolean} }) => state.modal.toDoFormVisible);
    const toDos = useSelector((state: any) => state.content.toDos);

    const priorities = ["Low", "Standard", "High"];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "todotitle":
                setTitle(e.target.value);
                break;
            case "todocontent":
                setContent(e.target.value);
                break;
            case "tododueDate":
                setDueDate(e.target.value);
                break;
            case "todopriority":
                setPriority(e.target.value);
                break;
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const toDosCopy = [...toDos];
        const iD = idGenerator.generateID();
        const newToDo:ToDoInterface = todoObject(title, content, dueDate, priority, iD, []);
        console.log(newToDo);
        toDosCopy.push(newToDo);
        dispatch(addToDo(newToDo));
        database.updateDatabase(toDosCopy, "todos");
        console.log(auth.currentUser);
        if (!auth.currentUser) {
            dispatch(openModal("You are not signed in. ToDos are saved in local storage."));
        }
        dispatch(toggleToDoForm());
    }

    if (todoFormVisible) {
        return (
           <StandardForm close={() => dispatch(toggleToDoForm())} heading={"Add a new ToDo"} onSubmit={handleSubmit} submitText={"Add"} id={"formdiv"}>
               <>
                   <TextInputElement name={"todotitle"} heading={"Title"} value={title} handleChange={handleInputChange} required={true}/>
                   <TextInputElement name={"todocontent"} value={content} heading={"Content (optional)"} handleChange={handleInputChange} required={false}/>
                   <DateInputElement name={"tododate"} value={dueDate} heading={"Due date:"} handleChange={handleInputChange} required={true}/>
                   <RadioInputElement name={"todopriority"} values={priorities} heading={"Priority"} handleChange={handleInputChange} />
               </>
           </StandardForm>
        )
    } else {
        return null;
    }
}