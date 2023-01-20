import React, {useEffect} from "react";
import "../Stylesheets/Account.css";
import {auth} from "../Modules/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LogoDiv from "../LogoDiv";
import GenericLoneDiv from "../GenericLoneDiv";


// Function for displaying the account page
export default function Account() {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(auth.currentUser);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                navigate("/");
            }
        });
        return unsubscribe;
    }, [navigate]);

    // Function for logging out
    const signOutUser = () => {
        signOut(auth).then(() => {
            navigate("/home");
        }).catch((error) => {
            // An error happened.
        });
    }

    // Function for handling the change password button
    const changePassword = () => {
        navigate("/reauthenticate", { state: { path: "/change-password" } });
    }

    return (
        <GenericLoneDiv heading={"Account info"}>
            <>
            <div className={"accountcontentdiv"}>
                <div className={"accountitemdiv"}>
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
                    <div className={"font-bold text-lg"}>
                        <h2>Actions</h2>
                    </div>
                    <div  className={"accountbuttondiv"}>
                        <button className={"accountButton"} onClick={changePassword}>Change password</button>
                        <button className={"accountButton"} id={"delete-account"}>Delete account</button>
                        <button className={"accountButton"} onClick={() => navigate(-1)}>Back</button>
                        <button className={"accountButton"} id={"logout"} onClick={signOutUser}>Log Out</button>
                    </div>
                </div>
            </div>
            </>
        </GenericLoneDiv>
    );
}