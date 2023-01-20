import React from "react";
import NavItem from "./NavItem";
import LogoDiv from "./LogoDiv";
import {useNavigate} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Modules/firebase";
import { useDispatch } from "react-redux";
import { toggleToDoForm } from "./Redux/modalSlice";
import {FaPlus, MdAccountCircle} from "react-icons/all";

// Component for the header of the app
export default function Header(props: { active: string }) {
    const dispatch = useDispatch();

    const navitems = [["home", "house"], ["done", "done"], ["projects", "assignment"]];
    const navigate = useNavigate();

    // Function navigating to the login or account page
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
        <header id={"header"} className={"shadow-md"}>
            <LogoDiv />
            <div id={"navigationdiv"} className={"border-gray-200 border-2 rounded-xl grid grid-cols-3 gap-0.5 bg-gray-200"}>
                {navitems.map((item) => <NavItem key={item[0]} text={item[0]} icon={item[1]} active={props.active} />)}
            </div>
            <div id={"rightdiv"}>
                <button id={"addnewbutton"} className={"text-lg rounded-xl bg-green-600 transition-all hover:shadow-xl"}
                        onClick={() => dispatch(toggleToDoForm())}>
                    <span className={"hidden md:inline"}>Add ToDo</span>
                    <span className={"md:hidden"}><FaPlus/></span>
                </button>
                <button id={"loginbutton"} className={"rounded-xl bg-gray-200 transition-all hover:shadow-xl"} onClick={toLogin}>
                    <span className={"hidden md:inline"}>Account</span>
                    <span className={"md:hidden text-2xl"}><MdAccountCircle/></span>
                </button>
            </div>
        </header>
    ) ;
}
