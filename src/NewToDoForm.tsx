import React from "react";
import DateConverter from "./DateConverter";

export default function NewToDoForm(props: { formVisible: boolean, close: () => void, newToDo: (heading: string, text: string, date: Date, priority: string) => void }) {
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [dueDate, setDueDate] = React.useState(DateConverter.convertToInputFormat(new Date()));
    const [priority, setPriority] = React.useState("Normal");

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
            <div id="formdiv" style={{display: "block"}}>
                <div id="closebuttondiv">
                    <button id="closebutton" onClick={props.close}><span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <h2 className="formheading">Add a new ToDo</h2>
                <form onSubmit={handleSubmit}>
                    <div className="inputdiv">
                        <label htmlFor="todotitle">
                            Title:
                        </label>
                        <input type="text" name="todotitle" id="todotitle" required={true} value={title} onChange={handleTitleChange}/>
                    </div>
                    <div className="inputdiv"><label htmlFor="todocontent">
                        Content (optional):</label>
                        <input type="text" name="todocontent" id="todocontent" value={content} onChange={handleContentChange}/>
                    </div>
                    <div className="inputdiv"><label htmlFor="tododate">Due date:</label>
                        <input type="date" name="tododate" id="tododate" required={true} value={dueDate} onChange={handleDueDateChange}/>
                    </div>
                    <div className="inputdiv">
                        <label htmlFor="radiocontainer">Priority:</label>
                        <div className="radiocontainer" >
                            <input type="radio" name="todopriority" value="Low" id="Low" onChange={handlePriorityChange}/>
                            <label htmlFor="Low">Low</label>
                            <input type="radio" name="todopriority" value="Standard" id="Standard" onChange={handlePriorityChange}/>
                            <label htmlFor="Standard">Standard</label>
                            <input type="radio" name="todopriority" value="High" id="High" onChange={handlePriorityChange}/>
                            <label htmlFor="High">High</label>
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