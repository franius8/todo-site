import React from "react";
import "./Stylesheets/Account.css";
import {auth} from "./Modules/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LogoDiv from "./LogoDiv";

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
            <LogoDiv />
            <div className={"accountcontentdiv"}>
                <div className={"accountitemdiv"}>
                    <div className={"accountitemtitlediv"}>
                        <h2>Account info</h2>
                    </div>
                    <div className={"accountitemcontentdiv"}>
                        <div className={"accountitemcontentitemdiv"}>
                            <div className={"accountitemcontentitemtitlediv"}>
                                <h3>Name</h3>
                            </div>
                            <div className={"accountitemcontentitemcontentdiv"}>
                                <p>{user?.displayName === null ? "No username in database" : user?.displayName}</p>
                            </div>
                        </div>
                        <div className={"accountitemcontentitemdiv"}>
                            <div className={"accountitemcontentitemtitlediv"}>
                                <h3>Email</h3>
                            </div>
                            <div className={"accountitemcontentitemcontentdiv"}>
                                <p>{user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"accountitemdiv"}>
                    <div className={"accountitemtitlediv"}>
                        <h2>Actions</h2>
                    </div>
                    <div  className={"accountbuttondiv"}>
                        <button className={"accountButton"}>Change password</button>
                        <button className={"accountButton"} id={"delete-account"}>Delete account</button>
                        <button className={"accountButton"} onClick={toHome}>Back to home</button>
                        <button className={"accountButton"} id={"logout"} onClick={signOutUser}>Log Out</button>
                    </div>
                </div>
            </div>
        </div>
    );
}