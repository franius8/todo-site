import React from "react";
import NavItem from "./NavItem";
import LogoDiv from "./LogoDiv";
import {useNavigate} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Modules/firebase";
import { useDispatch } from "react-redux";
import { toggleToDoForm } from "./Redux/modalSlice";

// Component for the header of the app
export default function Header(props: { active: string }) {
    const dispatch = useDispatch();

    const navitems = [["home", "house"], ["done", "done"], ["projects", "assignment"]];
    const navigate = useNavigate();

    // Function navingating to the login or account page
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
                <button id={"loginbutton"} onClick={toLogin}>
                    Account
                </button>
            </div>
        </header>
    ) ;
}
