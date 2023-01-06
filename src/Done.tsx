import React from "react";
import Header from "./Header";
import NewToDoForm from "./NewToDoForm";

export default function Done(props: { formVisible: boolean, newToDo: () => void, closeToDo: () => void }) {
    return (
        <>
            <Header active={"done"} newTodo={props.newToDo}/>
            <div id={"donediv"}>
                <div id="actiondiv">No ToDos marked as done.</div>
            </div>
            <NewToDoForm formVisible={props.formVisible} close={props.closeToDo}/>
        </>
    );
}