import React from "react";
import InputElement from "./FormComponents/InputElement";
import GenericLoneDiv from "./GenericLoneDiv";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "./Modules/firebase";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const LoginFormDiv = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ButtonDiv = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 1rem;
`

const LoginButton = styled.button`
      border-radius: 1rem;
      border: 5px solid var(--main-color);
      background-color: var(--main-color);
      padding: 0.5rem 1rem;
      font-family: inherit;
      font-size: inherit;
      font-weight: bold;
      color: white;
      align-self: center;
      justify-self: center;
`

const RegisterButton = styled.button`
      border-radius: 1rem;
      border: 5px solid var(--main-color);
      background-color: white;
      padding: 0.5rem 1rem;
      font-family: inherit;
      font-size: inherit;
      font-weight: bold;
      color: var(--main-color);
      align-self: center;
      justify-self: center;
      &:hover {
        background-color: var(--main-color);
        color: white;
        cursor: pointer;
      }
    `;

const ForgotPasswordLink = styled.a`
  color: var(--main-color);
  cursor: pointer;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`


export default function Login() {
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

    const toForgotPassword = () => {
        navigate("/forgot-password");
    }

    if (getAuth().currentUser) {
       return <div>Already logged in</div>
    } else {
        return (
            <GenericLoneDiv>
                <>
                    <LoginFormDiv>
                        <h2>Login</h2>
                        <LoginForm id={"loginform"} onSubmit={login}>
                            <InputElement type={"email"} name={"email"} value={email} heading={"Email"}
                                          handleChange={handleEmailChange} required={true}/>
                            <InputElement type={"password"} name={"password"} value={password} heading={"Password"}
                                          handleChange={handlePasswordChange} required={true}/>
                        </LoginForm>
                    </LoginFormDiv>
                    <ButtonDiv>
                        <RegisterButton onClick={toRegister}>
                            Register
                        </RegisterButton>
                        <LoginButton type={"submit"} form={"loginform"}>
                            Login
                        </LoginButton>
                    </ButtonDiv>
                    <ForgotPasswordLink onClick={toForgotPassword}>Forgot password</ForgotPasswordLink>
                </>
            </GenericLoneDiv>
        );
    }
}