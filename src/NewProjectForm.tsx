import React from "react";
import DateConverter from "./DateConverter";
import Todomanipulator from "./todomanipulator";

export default function NewProjectForm(props: { formVisible: boolean, close: () => void }) {
    const [projectName, setProjectName] = React.useState("");
    const [projectDate, setProjectDate] = React.useState(DateConverter.convertToInputFormat(new Date()));
    const [priority, setPriority] = React.useState("");

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
        Todomanipulator.createProject(projectName, [], new Date(projectDate), priority);
        props.close();
    }

    if (props.formVisible) {
        return (
            <div id="projectformdiv" style={{display: "block"}}>
                <div id="closebuttondiv">
                    <button id="closebutton" onClick={props.close}><span className="material-symbols-outlined">close</span></button>
                </div>
                <h2 className="formheading">Add a new Project</h2>
                <form onSubmit={handleSubmit}>
                    <div className="inputdiv">
                        <label htmlFor="projectname">Name:</label>
                        <input type="text" name="projectname" id="projectname" required={true} value={projectName} onChange={handdleNameChange}/>
                    </div>
                    <div className="inputdiv">
                        <label htmlFor="projectdate">Due date:</label>
                        <input type="date" name="projectdate" id="projectdate" required={true} value={projectDate} onChange={handleDateChange}/>
                    </div>
                    <div className="inputdiv">
                        <label htmlFor="radiocontainer">Priority:</label>
                        <div className="radiocontainer">
                            <input type="radio" name="projectpriority" value="Normal" id="Normal" onChange={handlePriorityChange}/>
                            <label htmlFor="Normal">Normal</label>
                            <input type="radio" name="projectpriority" value="Urgent" id="Urgent" onChange={handlePriorityChange}/>
                            <label htmlFor="Urgent">Urgent</label></div>
                    </div>
                    <button type="submit" id="todosubmit">Add</button>
                </form>
            </div>
        );
    } else {
        return null;
    }
}