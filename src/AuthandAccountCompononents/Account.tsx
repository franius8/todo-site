import React, { useEffect } from "react";
import { auth } from "../Modules/firebase";
import { signOut, updateEmail, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GenericLoneDiv from "../GenericLoneDiv";
import GenericButton from "../GenericButton";
import DeleteButton from "../DeleteButton";
import { FaEdit } from "react-icons/all";

// Function for displaying the account page
export default function Account() {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(auth.currentUser);
    const [nameEdit, setNameEdit] = React.useState(false);
    const [emailEdit, setEmailEdit] = React.useState(false);
    const [email, setEmail] = React.useState(user?.email);
    const [name, setName] = React.useState(user?.displayName);

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

    const toggleNameEdit = () => {
        setNameEdit(!nameEdit);
    }

    const toggleEmailEdit = () => {
        setEmailEdit(!emailEdit);
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handleNameUpdate = () => {
        if (auth.currentUser) {
            updateProfile(auth.currentUser, {
                displayName: name ?? ""
            }).then(() => {
                setNameEdit(false);
            }).catch((error) => {
                // An error happened.
            });
        } else {
            setNameEdit(false);
        }
    }

    const handleEmailUpdate = () => {
        if (auth.currentUser) {
            updateEmail(auth.currentUser, email ?? "").then(() => {
                setEmailEdit(false);
            }).catch((error) => {
                // An error happened.
            });
        } else {
            setEmailEdit(false);
        }
    }

    let emailField;

    if (emailEdit) {
        emailField = <form onSubmit={handleEmailUpdate}>
            <input type={"email"} className={"border border-gray-300 rounded-md p-2"}
                   value={email ?? ""} onChange={handleEmailChange} placeholder={"Enter new email"}/>
        </form>

    } else {
        emailField = <p>{user?.email}</p>
    }

    let nameField;

    if (nameEdit) {
        nameField = <form onSubmit={handleNameUpdate}>
            <input type={"text"} className={"border border-gray-300 rounded-md p-2"}
                           value={name ?? ""} onChange={handleNameChange} placeholder={"Enter new name"}/>
        </form>
    } else {
        nameField = <p>{user?.displayName === null ? "No username in database" : user?.displayName} </p>
    }

    return (
        <GenericLoneDiv heading={"Account info"}>
            <>
            <div className={"accountcontentdiv flex flex-col gap-6 mt-2"}>
                <div className={"grid gap-6 grid-cols-2"}>
                    <div className={"flex flex-col gap-4"}>
                        <div className={"flex gap-2 items-center"}>
                            <h3 className={"font-bold"}>Name</h3>
                            <FaEdit onClick={toggleNameEdit} className={"cursor-pointer"}/>
                        </div>
                        {nameField}
                    </div>
                    <div className={"flex flex-col gap-4"}>
                        <div className={"flex gap-2 items-center"}>
                            <h3 className={"font-bold"} >Email</h3>
                            <FaEdit onClick={toggleEmailEdit} className={"cursor-pointer"}/>
                        </div>
                        {emailField}
                    </div>
                </div>
                <div className={"accountitemdiv"}>
                    <div className={"font-bold text-lg"}>
                        <h2 className={"text-center mb-2"}>Actions</h2>
                    </div>
                    <div  className={"grid grid-rows-2 grid-cols-2 gap-2 [&>button]:w-full"}>
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