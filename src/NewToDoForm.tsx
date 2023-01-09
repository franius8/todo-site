import React from "react";
import StandardForm from "./FormComponents/StandardForm";
import TextInputElement from "./FormComponents/TextInputElement";
import DateInputElement from "./FormComponents/DateInputElement";
import RadioInputElement from "./FormComponents/RadioInputElement";
import DateConverter from "./Modules/DateConverter";
import { useSelector, useDispatch } from "react-redux";
import {openModal, toggleToDoForm} from "./Redux/modalSlice";
import {addToDo} from "./Redux/contentSlice";
import TodoObject from "./Modules/todoObject";
import idGenerator from "./Modules/idGenerator";
import {ProjectInterface, ToDoInterface} from "./Modules/d";
import todoObject from "./Modules/todoObject";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "./Modules/firebase";
import {collection, doc, updateDoc} from "firebase/firestore";

export default function NewToDoForm(props: { newToDo: (heading: string, text: string, date: Date, priority: string) => void }) {
    const toDos = useSelector((state: any) => state.content.toDos);

    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [dueDate, setDueDate] = React.useState(DateConverter.convertToInputFormat(new Date()));
    const [priority, setPriority] = React.useState("Normal");

    const todoFormVisible = useSelector((state: { modal: {toDoFormVisible: boolean} }) => state.modal.toDoFormVisible);
    const dispatch = useDispatch();

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

    const updateDatabase = async (toDosCopy: ToDoInterface[] | ProjectInterface[], type: string) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                try {
                    const docRef = await updateDoc(doc(collection(db, "users"), uid), {
                        [type]: JSON.stringify(toDosCopy)
                    });
                } catch (e) {
                }
            } else {
                let itemName;
                switch (type) {
                    case "todos":
                        itemName = "todoary";
                        break;
                    case "donetodos":
                        itemName = "donetodoary";
                        break;
                    case "projects":
                        itemName = "projectary";
                        break;
                    default:
                        itemName = "todoary";
                }
                dispatch(openModal("No user is currently signed in. ToDos are saved in local storage."));
                localStorage.setItem(itemName, (JSON.stringify(toDosCopy)));
            }
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const toDosCopy = [...toDos];
        const iD = idGenerator.generateID();
        const newToDo:ToDoInterface = todoObject(title, content, new Date(dueDate), priority, iD, []);
        toDosCopy.push(newToDo);
        dispatch(addToDo(newToDo));
        updateDatabase(toDosCopy, "todos");
        dispatch(toggleToDoForm());
    }

    if (todoFormVisible) {
        return (
           <StandardForm close={() => dispatch(toggleToDoForm())} heading={"Add a new ToDo"} onSubmit={handleSubmit} submitText={"Add"} id={"formdiv"}>
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