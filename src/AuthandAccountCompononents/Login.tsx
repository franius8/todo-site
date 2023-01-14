import React from "react";
import InputElement from "../FormComponents/InputElement";
import GenericLoneDiv from "../GenericLoneDiv";
import GenericButton from "../GenericButton";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../Modules/firebase";
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

const ForgotPasswordLink = styled.a`
color: var(--main-color);
cursor: pointer;
font-weight: bold;
&:hover {
text-decoration: underline;
}
`

// Component for displaying the login page
export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    // Function for handling the login form submission
    const login = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in

                navigate("/home");
                // ...
            })
            .catch((error) => {


                
            });
    }

    // Function for handling email input change
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    // Function for handling password input change
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    // Function for navigating to register page
    const toRegister = () => {
        navigate("/register");
    }

    // Function for navigating to forgot password page
    const toForgotPassword = () => {
        navigate("/forgot-password");
    }

    if (getAuth().currentUser) {
       return <div>Already logged in</div>
    } else {
        return (
            <GenericLoneDiv heading={"Login"}>
                <>
                    <LoginFormDiv>
                        <LoginForm id={"loginform"} onSubmit={login}>
                            <InputElement type={"email"} name={"email"} value={email} heading={"Email"}
                                          handleChange={handleEmailChange} required/>
                            <InputElement type={"password"} name={"password"} value={password} heading={"Password"}
                                          handleChange={handlePasswordChange} required/>
                        </LoginForm>
                    </LoginFormDiv>
                    <ButtonDiv>
                        <GenericButton variantMain={false} type={"button"} form={""} onClick={toRegister}>
                            Register
                        </GenericButton>
                        <GenericButton variantMain type={"submit"} form={"loginform"} onClick={() => {/* nothing */}}>
                            Login
                        </GenericButton>
                    </ButtonDiv>
                    <ForgotPasswordLink onClick={toForgotPassword}>Forgot password</ForgotPasswordLink>
                </>
            </GenericLoneDiv>
        );
    }
}