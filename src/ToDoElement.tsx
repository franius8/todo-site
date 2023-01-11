import React, {useState, FormEvent, ChangeEvent, useEffect} from "react";
import {ToDoInterface} from "./Modules/d";
import dateConverter from "./Modules/DateConverter";
import { priorityGetter } from "./Modules/priorityGetter";

export default function ToDoElement(props: { toDo: ToDoInterface,
    modifyToDo: (iD: number, heading: string, text: string, date: string, priority: string) => void, deleteToDo: (iD: number) => void }) {
    const [duringEdit, setDuringEdit] = React.useState(false);

    const [title, setTitle] = useState(props.toDo.heading);
    const [content, setContent] = useState(props.toDo.text);
    const [dueDate, setDueDate] = useState(props.toDo.date);
    const [priority, setPriority] = useState(props.toDo.priority);
    const [priorityColor, setPriorityColor] = useState(priorityGetter(props.toDo.priority));

    useEffect(() => {
        setPriorityColor(priorityGetter(priority));
    }, [priority]);


        const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            switch (e.target.name) {
                case "todotitle":
                    setTitle(e.target.value);
                    break;
                case "todocontent":
                    setContent(e.target.value);
                    break;
                case "tododate":
                    setDueDate(e.target.value);
                    break;
                case "todopriority":
                    setPriority(e.target.value);
                    break;
            }
        }

        const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            props.modifyToDo(props.toDo.iD, title, content, dueDate, priority);
            setDuringEdit(false);
        }
        const toggleEdit = () => {
            setDuringEdit(!duringEdit);
        }
        const deleteToDo = () => {
            props.deleteToDo(props.toDo.iD);
        }

    if (!duringEdit) {
        return (
            <div className="todo">
                <div className="labelstripe" style={{backgroundColor: priorityColor}}></div>
                <div className="middlediv">
                    <div className="checkboxdiv">
                        <div className="checkbox" onClick={() => {}}>✓</div>
                    </div>
                    <div className="todocontent">
                        <div className="todoheading">{title}</div>
                        <div className="todotext">{content}</div>
                        <div className="tododate">
                            <div><span className="material-symbols-outlined">calendar_month</span></div>
                            <div>{dateConverter.convertToString(new Date(dueDate))} ({dateConverter.getDayDifference(new Date(dueDate))} days left)
                            </div>
                        </div>
                        <div className="todopriority">
                            <div className="prioritycircle" style={{backgroundColor: priorityColor}}></div>
                            <div>{priority} priority</div>
                        </div>
                    </div>
                    <div className="buttondiv">
                        <button className="editbutton" onClick={toggleEdit}>
                            <span className="material-symbols-outlined">edit</span></button>
                        <button className="deletebutton" onClick={deleteToDo}>
                            <span className="material-symbols-outlined">delete</span></button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="todo">
                <div className="labelstripe" style={{backgroundColor: priorityColor}}></div>
                <div className="middlediv">
                    <div className="checkboxdiv">
                        <div className="checkbox">✓</div>
                    </div>
                    <div className="duringedit">
                        <form className="todocontent" id="editform" onSubmit={handleSubmit}>
                            <div className="inputdiv"><label htmlFor="todotitleedit">Title:</label>
                                <input type="text" name="todotitleedit" id="todotitleedit" required={true} value={title} onChange={handleInputChange}/>
                            </div>
                            <div className="inputdiv"><label htmlFor="todocontentedit">Content (optional):</label>
                                <input type="text" name="todocontentedit" id="todocontentedit" value={content} onChange={handleInputChange}/>
                            </div>
                            <div className="inputdiv"><label htmlFor="tododateedit">Due date:</label>
                                <input type="date" name="tododateedit" id="tododateedit" required={true} value={dueDate} onChange={handleInputChange}/>
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
                    <div className="buttondiv">
                        <button className="cancelbutton" onClick={toggleEdit}>
                            <span className="material-symbols-outlined">undo</span>
                        </button>
                        <button className="acceptbutton" type="submit" form="editform">
                            <span className="material-symbols-outlined">check</span></button>
                    </div>
                </div>
            </div>
        );
    }
}