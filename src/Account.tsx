import React from "react";
import "./Stylesheets/Account.css";
import {auth} from "./firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Account() {
    const navigate = useNavigate();
    const user = auth.currentUser;
    const signOutUser = () => {
        signOut(auth).then(() => {
            navigate("/home");
        }).catch((error) => {
            // An error happened.
        });
    }
    const toHome = () => {
        navigate("/home");
    }
    return (
        <div id={"accountdiv"}>
            <h1>My Account</h1>
            <div id={"accountcontentdiv"}>
                <div id={"accountitemdiv"}>
                    <div id={"accountitemtitlediv"}>
                        <h2>Account info</h2>
                    </div>
                    <div id={"accountitemcontentdiv"}>
                        <div id={"accountitemcontentitemdiv"}>
                            <div id={"accountitemcontentitemtitlediv"}>
                                <h3>Name</h3>
                            </div>
                            <div id={"accountitemcontentitemcontentdiv"}>
                                <p>{user?.displayName}</p>
                            </div>
                        </div>
                        <div id={"accountitemcontentitemdiv"}>
                            <div id={"accountitemcontentitemtitlediv"}>
                                <h3>Email</h3>
                            </div>
                            <div id={"accountitemcontentitemcontentdiv"}>
                                <p>{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={toHome}>Back to home</button>
            <button id={"logoutbutton"} onClick={signOutUser}>Log Out</button>
        </div>
    );
}