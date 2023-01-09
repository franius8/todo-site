import React from "react";
import {ToDoInterface} from "./Modules/d";
import DateConverter from "./Modules/DateConverter";
import dateConverter from "./Modules/DateConverter";

export default function ToDo(props: { toDo: ToDoInterface,
    modifyToDo: (iD: number, heading: string, text: string, date: string, priority: string) => void, deleteToDo: (iD: number) => void
moveToDone: (iD: number) => void}) {
    const [duringEdit, setDuringEdit] = React.useState(false);

    const [title, setTitle] = React.useState(props.toDo.heading);
    const [content, setContent] = React.useState(props.toDo.text);
    const [dueDate, setDueDate] = React.useState(props.toDo.date);
    const [priority, setPriority] = React.useState(props.toDo.priority);

        let priorityColor;
            switch (priority) {
            case 'High':
                priorityColor = 'red';
                break;
            case 'Standard':
               priorityColor = 'orange';
               break;
            case 'Low':
                priorityColor = 'green';
                break;
            case 'Normal':
                priorityColor = 'skyblue';
                break;
            case 'Urgent':
                priorityColor = 'crimson';
                break;
            default:
                priorityColor = 'gray';
                break
        }
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
            props.modifyToDo(props.toDo.iD, title, content, dueDate, priority);
            setDuringEdit(false);
        }
        const toggleEdit = () => {
            setDuringEdit(!duringEdit);
        }
        const deleteToDo = () => {
            props.deleteToDo(props.toDo.iD);
        }
        const moveToDone = () => {
            props.moveToDone(props.toDo.iD);
        }

    if (!duringEdit) {
        return (
            <div className="todo">
                <div className="labelstripe" style={{backgroundColor: priorityColor}}></div>
                <div className="middlediv">
                    <div className="checkboxdiv">
                        <div className="checkbox" onClick={moveToDone}>✓</div>
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
                                <input type="text" name="todotitleedit" id="todotitleedit" required={true} value={title} onChange={handleTitleChange}/>
                            </div>
                            <div className="inputdiv"><label htmlFor="todocontentedit">Content (optional):</label>
                                <input type="text" name="todocontentedit" id="todocontentedit" value={content} onChange={handleContentChange}/>
                            </div>
                            <div className="inputdiv"><label htmlFor="tododateedit">Due date:</label>
                                <input type="date" name="tododateedit" id="tododateedit" required={true} value={dueDate} onChange={handleDueDateChange}/>
                            </div>
                            <div className="inputdiv"><label htmlFor="radiocontainer">Priority:</label>
                                <div className="radiocontainer">
                                    <input type="radio" name="todopriorityedit" value="Low" id="Low" onChange={handlePriorityChange}
                                           checked={priority === "Low"}/>
                                    <label htmlFor="Low">Low</label>
                                    <input type="radio" name="todopriorityedit" value="Standard" id="Standard" onChange={handlePriorityChange}
                                           checked={priority === "Standard"}/>
                                    <label htmlFor="Standard">Standard</label>
                                    <input type="radio" name="todopriorityedit" value="High" id="High" onChange={handlePriorityChange}
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