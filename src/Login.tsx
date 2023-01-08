import React from "react";
import "./Stylesheets/Login.css"
import LogoDiv from "./LogoDiv";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

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

    const LoginDiv = styled.div`
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      border: 3px solid var(--light-gray);
      padding: 1rem;
      border-radius: 1rem;
    `;

    const RegisterButton = styled.button`
      border-radius: 1rem;
      border: 5px solid var(--main-color);
      background-color: white;
      padding: 0.5rem 1rem;
      font-family: inherit;
      font-size: inherit;
      font-weight: bold;
      color: var(--main-color);
      width: 10rem;
      align-self: center;
      justify-self: center;    
    `;

    return (
        <LoginDiv>
            <LogoDiv />
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
            <RegisterButton onClick={toRegister}>
                Register
            </RegisterButton>
        </LoginDiv>
    );
}