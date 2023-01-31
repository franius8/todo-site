import React, { useEffect } from "react";
import { auth } from "../Modules/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GenericLoneDiv from "../GenericLoneDiv";
import GenericButton from "../GenericButton";
import DeleteButton from "../DeleteButton";
import {FaEdit} from "react-icons/all";

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
            <div className={"accountcontentdiv flex flex-col gap-6 mt-2"}>
                <div className={"grid gap-6 grid-cols-2"}>
                    <div className={"flex flex-col gap-4"}>
                        <div className={"flex gap-2 items-center"}>
                            <h3 className={"font-bold"}>Name</h3>
                            <FaEdit className={"cursor-pointer"}/>
                        </div>
                        <p>{user?.displayName === null ? "No username in database" : user?.displayName}</p>
                    </div>
                    <div className={"flex flex-col gap-4"}>
                        <div className={"flex gap-2 items-center"}>
                            <h3 className={"font-bold"} >Email</h3>
                            <FaEdit className={"cursor-pointer"}/>
                        </div>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <div className={"accountitemdiv"}>
                    <div className={"font-bold text-lg"}>
                        <h2 className={"text-center mb-2"}>Actions</h2>
                    </div>
                    <div  className={"grid grid-rows-2 grid-cols-2 gap-2"}>
                        <GenericButton form={""} variantMain={true} type={"button"} onClick={changePassword}>
                            Change password
                        </GenericButton>
                        <DeleteButton onClick={() => {}}>Delete account</DeleteButton>
                        <GenericButton form={""} type={"button"} variantMain={true} onClick={() => navigate(-1)}>
                            Back
                        </GenericButton>
                        <DeleteButton onClick={signOutUser}>Log Out</DeleteButton>
                    </div>
                </div>
            </div>
            </>
        </GenericLoneDiv>
    );
}