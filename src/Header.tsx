import React from "react";
import NavItem from "./NavItem";
import LogoDiv from "./LogoDiv";
import {useNavigate} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Modules/firebase";
import { useDispatch } from "react-redux";
import { toggleToDoForm } from "./Redux/modalSlice";

export default function Header(props: { active: string, newTodo: () => void}) {
    const navitems = [["home", "house"], ["done", "done"], ["projects", "assignment"]];
    const navigate = useNavigate();

    const dispatch = useDispatch();

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
            <LogoDiv />
            <div id={"navigationdiv"}>
                {navitems.map((item) => <NavItem key={item[0]} text={item[0]} icon={item[1]} active={props.active} />)}
            </div>
            <div id={"rightdiv"}>
                <button id={"addnewbutton"} onClick={() => dispatch(toggleToDoForm())}>
                    Add ToDo
                </button>
                <div id={"loginbutton"} onClick={toLogin}>
                    Account
                </div>
            </div>
        </header>
    ) ;
}
