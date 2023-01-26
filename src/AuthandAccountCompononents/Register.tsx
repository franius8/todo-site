import React, {useState} from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db, auth } from "../Modules/firebase";
import {doc, setDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import GenericLoneDiv from "../GenericLoneDiv";
import TextInputElement from "../FormComponents/TextInputElement";
import InputElement from "../FormComponents/InputElement";
import GenericButton from "../GenericButton";

// Component for registering a new user
export default function Register() {
    useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("")

    // Function for handling form submit
    const register = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;
                await setDoc(doc(db, "users", user.uid), {
                    user: user.uid,
                    email,
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

                // ..
            });
    }

    // Function for handling name input change
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    // Function for handling email input change
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    // Function for handling password input change
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    // Function for handling repeat password input change
    const handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(event.target.value);
    }

    return (
        <GenericLoneDiv heading={"Register"}>
            <form id={"loginformbody"} onSubmit={register}>
                <TextInputElement name={"name"} value={name}
                                  heading={"Name"} handleChange={handleNameChange} required/>
                <InputElement type={"email"} name={"email"} value={email}
                              heading={"Email"} handleChange={handleEmailChange} required/>
                <InputElement type={"password"} name={"password"} value={password}
                              heading={"Password"} handleChange={handlePasswordChange} required/>
                <InputElement type={"password"} name={"repeatpassword"} value={repeatPassword}
                              heading={"Repeat password"} handleChange={handleRepeatPasswordChange} required/>
                <div id={"loginformbodybutton"}>
                    <GenericButton form={""} type={"submit"} variantMain={true} onClick={() => {}}>
                        Register
                    </GenericButton>
                </div>
            </form>
        </GenericLoneDiv>
    )
}