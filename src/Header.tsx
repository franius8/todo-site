import React from "react";
import NavItem from "./NavItem";
import {useNavigate} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./firebase";

export default function Header(props: { active: string, newTodo: () => void}) {
    const navitems = [["home", "house"], ["done", "done"], ["projects", "assignment"]];
    const navigate = useNavigate();
    const backToHome = () => {
        navigate("/home");
    }
    const toLogin = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/account");
            } else {
                navigate("/login");
            }
        });
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
                {navitems.map((item) => <NavItem key={item[0]} text={item[0]} icon={item[1]} active={props.active} />)}
            </div>
            <div id={"rightdiv"}>
                <button id={"addnewbutton"} onClick={props.newTodo}>
                    Add ToDo
                </button>
                <div id={"loginbutton"} onClick={toLogin}>
                    <span className="material-symbols-outlined md-36">account_circle</span>
                </div>
            </div>
        </header>
    ) ;
}