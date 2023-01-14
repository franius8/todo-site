import React from "react";
import InputElement from "../FormComponents/InputElement";
import GenericLoneDiv from "../GenericLoneDiv";
import GenericButton from "../GenericButton";
import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import {EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "../Modules/firebase";

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

// This component is used to reauthenticate a user before they can perform sensitive actions
export default function Reauthenticate() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {path} = state as {path: string};
    const [password, setPassword] = React.useState("");

    // Function for handling password input change
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    // Function for handling form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = auth.currentUser;
        if (user?.email) {
        const credential = EmailAuthProvider.credential(user?.email, password);
            reauthenticateWithCredential(user, credential).then(() => {
               navigate(path);
            }).catch((error) => {
                /* temporarily nothing */
            });
        }
    }

    return (
        <GenericLoneDiv heading={"Enter Password"}>
                <LoginFormDiv>
                    <LoginForm id={"loginform"} onSubmit={handleSubmit}>
                        <InputElement type={"password"} name={"password"} value={password} heading={"Password"}
                                      handleChange={handlePasswordChange} required/>
                        <GenericButton type={"submit"} onClick={() => {/* nothing */}} form={"loginform"} variantMain>
                            Login
                        </GenericButton>
                        <GenericButton type={"button"} form={""} variantMain={false} onClick={() => navigate(-1)}>
                            Back
                        </GenericButton>
                    </LoginForm>
                </LoginFormDiv>
        </GenericLoneDiv>
    )
}