import React from "react";
import Header from "./Header";

export default function Done() {
    return (
        <>
            <Header active={"done"}/>
            <div id={"donediv"}>
                <div id="actiondiv">No ToDos marked as done.</div>
            </div>
        </>
    );
}