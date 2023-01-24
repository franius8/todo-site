import React, {useState, FormEvent, ChangeEvent, useEffect} from "react";
import ElementDate from "./ElementDate";
import ElementPriority from "./ElementPriority";
import ElementButtonDiv from "./ElementButtonDiv";
import EditFormButtonDiv from "./EditFormButtonDiv";
import {ToDoInterface} from "./Modules/d";
import { priorityGetter } from "./Modules/priorityGetter";
import { FaCheck} from "react-icons/fa";
import Checkbox from "./Checkbox";
import Labelstripe from "./Labelstripe";

// Component for displaying ToDos waiting to be done
export default function ToDoElement(props: { toDo: ToDoInterface,
    modifyToDo: (iD: number, heading: string, text: string, date: string, priority: string, projectiDs: number[]) => void,
    deleteToDo: (iD: number) => void, moveToDone: (iD: number) => void }) {
    const [duringEdit, setDuringEdit] = React.useState(false);

    const [heading, setHeading] = useState(props.toDo.heading);
    const [text, setText] = useState(props.toDo.text);
    const [date, setDate] = useState(props.toDo.date);
    const [priority, setPriority] = useState(props.toDo.priority);
    const [priorityColor, setPriorityColor] = useState(priorityGetter(props.toDo.priority));

    useEffect(() => {
        setPriorityColor(priorityGetter(priority));
    }, [priority]);


        // Generic function for handling heading input change
        const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            switch (e.target.name) {
                case "todotitleedit":
                    setHeading(e.target.value);
                    break;
                case "todocontentedit":
                    setText(e.target.value);
                    break;
                case "tododateedit":
                    setDate(e.target.value);
                    break;
                case "todopriorityedit":
                    setPriority(e.target.value);
                    break;
                default:
                    break;
            }
        }

        // Function for handling form submit
        const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            props.modifyToDo(props.toDo.iD, heading, text, date, priority, props.toDo.projectiDs);
            setDuringEdit(false);
        }

        // Function for toggling ToDo edit mode
        const toggleEdit = () => {
            setDuringEdit(!duringEdit);
        }

        // Function for handling delete button click
        const deleteToDo = () => {
            props.deleteToDo(props.toDo.iD);
        }


        // Function for handling move to done button click
        const moveToDone = () => {
            props.moveToDone(props.toDo.iD);
        }

    if (!duringEdit) {
        return (
            <div className="todo shadow-lg border-2 border-gray-200 rounded-xl transition-all hover:bg-gray-100">
                <Labelstripe priority={props.toDo.priority} />
                <div className="middlediv">
                    <Checkbox onClick={moveToDone}/>
                    <div className="todocontent">
                        <div className="todoheading">{heading}</div>
                        <div className="todotext">{text}</div>
                        <ElementDate done={false} date={date} />
                        <ElementPriority priority={priority} priorityColor={priorityColor} done={false}/>
                    </div>
                    <ElementButtonDiv toggleEdit={toggleEdit} delete={deleteToDo} />
                </div>
            </div>
        );
    } else {
        return (
            <div className="todo">
                <Labelstripe priority={props.toDo.priority} />
                <div className="middlediv">
                    <div className="checkboxdiv">
                        <div className="checkbox">✓</div>
                    </div>
                    <div className="duringedit">
                        <form className="todocontent" id="editform" onSubmit={handleSubmit}>
                            <div className="inputdiv"><label htmlFor="todotitleedit">Title:</label>
                                <input type="text" name="todotitleedit" id="todotitleedit" required value={heading} onChange={handleInputChange}/>
                            </div>
                            <div className="inputdiv"><label htmlFor="todocontentedit">Content (optional):</label>
                                <input type="text" name="todocontentedit" id="todocontentedit" value={text} onChange={handleInputChange}/>
                            </div>
                            <div className="inputdiv"><label htmlFor="tododateedit">Due date:</label>
                                <input type="date" name="tododateedit" id="tododateedit" required value={date} onChange={handleInputChange}/>
                            </div>
                            <div className="inputdiv"><label htmlFor="radiocontainer">Priority:</label>
                                <div className="radiocontainer">
                                    <input type="radio" name="todopriorityedit" value="Low" id="Low" onChange={handleInputChange}
                                           checked={priority === "Low"}/>
                                    <label htmlFor="Low">Low</label>
                                    <input type="radio" name="todopriorityedit" value="Standard" id="Standard" onChange={handleInputChange}
                                           checked={priority === "Standard"}/>
                                    <label htmlFor="Standard">Standard</label>
                                    <input type="radio" name="todopriorityedit" value="High" id="High" onChange={handleInputChange}
                                           checked={priority === "High"}/>
                                    <label htmlFor="High">High</label></div>
                            </div>
                        </form>
                    </div>
                    <EditFormButtonDiv toggleEdit={toggleEdit} />
                </div>
            </div>
        );
    }
}