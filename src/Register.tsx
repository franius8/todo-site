import React, {useState} from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db, auth } from "./Modules/firebase";
import {doc, setDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import GenericLoneDiv from "./GenericLoneDiv";
import TextInputElement from "./FormComponents/TextInputElement";
import InputElement from "./FormComponents/InputElement";

export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("")

    const register = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;
                await setDoc(doc(db, "users", user.uid), {
                    user: user.uid,
                    email: email,
                    todos: "[]",
                    done: "[]",
                    projects: "[]"
                });
                updateProfile(user, {
                    displayName: name
                }).then(() => {
                   alert("User registered successfully");
                }).catch((error) => {
                    // An error occurred
                    // ...
                });
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
    const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(event.target.value);
    }

    return (
        <GenericLoneDiv>
            <>
                <div id={"loginform"}>
                    <div id={"loginformheader"}>
                        Register
                    </div>
                    <form id={"loginformbody"} onSubmit={register}>
                        <TextInputElement name={"name"} value={name}
                                          heading={"Name"} handleChange={handleNameChange} required={true}/>
                        <InputElement type={"email"} name={"email"} value={email}
                                      heading={"Email"} handleChange={handleEmailChange} required={true}/>
                        <InputElement type={"password"} name={"password"} value={password}
                                      heading={"Password"} handleChange={handlePasswordChange} required={true}/>
                        <InputElement type={"password"} name={"repeatpassword"} value={repeatPassword}
                                      heading={"Repeat password:"} handleChange={handleRepeatPasswordChange} required={true}/>
                        <div id={"loginformbodybutton"}>
                            <button>
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </>
        </GenericLoneDiv>
    )
}