import React from "react";
import NavItem from "./NavItem";

export default function Header(props: { active: string }) {
    const navitems = [["home", "house"], ["done", "done"], ["projects", "assignment"]];
    return (
        <header id={"header"}>
            <div id={"logodiv"}>
                <div id={"checkmark"}>
                    &#10003;
                </div>
                <div id={"logo"}>
                    To Do
                </div>
            </div>
            <div id={"navigationdiv"}>
                {navitems.map((item) => <NavItem text={item[0]} icon={item[1]} active={props.active} />)}
            </div>
            <button id={"addnewbutton"}>
                Add ToDo
            </button>
        </header>
    ) ;
}