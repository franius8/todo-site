import React from "react";
import InputElement from "../FormComponents/InputElement";
import GenericButton from "../GenericButton";
import GenericLoneDiv from "../GenericLoneDiv";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "firebase/auth";
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

// Component for dislpaying the change password page
export default function ChangePassword() {
  const navigate = useNavigate();
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  // Function for handling password input change
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  /// Function for handling confirm password input change
  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  }

  // Function for handling the form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const user = auth.currentUser;
      if (user && password === confirmPassword) {
        updatePassword(user, password).then(() => {
          navigate("/account")
        }).catch((error) => {
          // An error ocurred
          // ...
        });
      }
    }

  return (
      <GenericLoneDiv heading={"Enter a new password"}>
        <LoginFormDiv>
          <LoginForm id={"loginform"} onSubmit={handleSubmit}>
            <InputElement type={"password"} name={"password"} value={password} heading={"Password"}
                          handleChange={handlePasswordChange} required/>
            <InputElement type={"password"} name={"confirmpassword"} value={confirmPassword} heading={"Confirm password"}
                          handleChange={handleConfirmPasswordChange} required/>
            <GenericButton type={"submit"} onClick={() => {}} form={"loginform"} variantMain>
              Login
            </GenericButton>
            <GenericButton type={"button"} form={""} variantMain={false} onClick={() => navigate(-2)}>
              Back
            </GenericButton>
          </LoginForm>
        </LoginFormDiv>
      </GenericLoneDiv>
  )
}