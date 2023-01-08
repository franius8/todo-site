import React, {useState} from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db, auth } from "./firebase";
import {doc, setDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import LogoDiv from "./LogoDiv";

export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
    return (
        <div id={"login"}>
            <LogoDiv />
            <div id={"loginform"}>
                <div id={"loginformheader"}>
                    Register
                </div>
                <form id={"loginformbody"} onSubmit={register}>
                    <div id={"loginformbodyinputdiv"}>
                        <input id={"loginformbodyinput"} type={"text"} placeholder={"Name"} value={name} onChange={handleNameChange} />
                    </div>
                    <div className={"loginformbodyinput"}>
                        <input type="email" placeholder="E-mail" value={email} onChange={handleEmailChange}/>
                    </div>
                    <div className={"loginformbodyinput"}>
                        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                    </div>
                    <div className={"loginformbodyinput"}>
                        <input type="password" placeholder="Repeat password"/>
                    </div>
                    <div id={"loginformbodybutton"}>
                        <button>
                            Register
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}