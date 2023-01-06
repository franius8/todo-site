import React from "react";
import NavItem from "./NavItem";
import {useNavigate} from "react-router-dom";

export default function Header(props: { active: string, newTodo: () => void}) {
    const navitems = [["home", "house"], ["done", "done"], ["projects", "assignment"]];
    const navigate = useNavigate();
    const backToHome = () => {
        navigate("/home");
    }
    return (
        <header id={"header"}>
            <div id={"logodiv"} onClick={backToHome}>
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
            <button id={"addnewbutton"} onClick={props.newTodo}>
                Add ToDo
            </button>
        </header>
    ) ;
}