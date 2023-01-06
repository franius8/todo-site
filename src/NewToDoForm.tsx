import React from "react";

export default function NewToDoForm(props: { formVisible: boolean, close: () => void }) {
    const display = props.formVisible ? "block" : "none";
    return (
        <div id="formdiv" style={{display: display}}>
            <div id="closebuttondiv">
                <button id="closebutton" onClick={props.close}><span className="material-symbols-outlined">close</span></button>
            </div>
            <h2 className="formheading">Add a new ToDo</h2>
            <form>
                <div className="inputdiv">
                    <label htmlFor="todotitle">
                    Title:
                    </label>
                    <input type="text" name="todotitle" id="todotitle" required={true}/>
                </div>
                <div className="inputdiv"><label htmlFor="todocontent">
                    Content (optional):</label>
                    <input type="text" name="todocontent" id="todocontent" />
                </div>
                <div className="inputdiv"><label htmlFor="tododate">Due date:</label>
                    <input type="date" name="tododate" id="tododate" required={true}/>
                </div>
                <div className="inputdiv">
                    <label htmlFor="radiocontainer">Priority:</label>
                    <div className="radiocontainer">
                        <input type="radio" name="todopriority" value="Low" id="Low"/>
                        <label
                        htmlFor="Low">Low</label>
                        <input type="radio" name="todopriority" value="Standard" id="Standard"/>
                        <label
                        htmlFor="Standard">Standard</label>
                        <input type="radio" name="todopriority" value="High"
                                                                  id="High"/><label htmlFor="High">High</label></div>
                </div>
                <button type="submit" id="todosubmit">Add</button>
            </form>
        </div>
    )
}