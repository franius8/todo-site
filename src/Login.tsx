import React from "react";
import "./Stylesheets/Login.css"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom";

export default function Login() {

    const auth = getAuth();
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const login = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/home");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
    const toRegister = () => {
        navigate("/register");
    }

    return (
        <div id={"login"}>
            <div id={"logodiv"}>
                <div id={"checkmark"}>
                    &#10003;
                </div>
                <div id={"logo"}>
                    To Do
                </div>
            </div>
            <div id={"loginform"}>
                <div id={"loginformheader"}>
                    Login
                </div>
                <form id={"loginformbody"} onSubmit={login}>
                    <div id={"loginformbodyinput"}>
                        <input type="email" placeholder="E-mail" value={email} onChange={handleEmailChange}/>
                    </div>
                    <div id={"loginformbodyinput"}>
                        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                    </div>
                    <div id={"loginformbodybutton"}>
                        <button>
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <button id={"registerbutton"} onClick={toRegister}>
                Register
            </button>
        </div>
    );
}