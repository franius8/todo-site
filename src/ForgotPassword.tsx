import React, { useState } from "react";
import { auth } from "./Modules/firebase";
import GenericLoneDiv from "./GenericLoneDiv";
import InputElement from "./FormComponents/InputElement";
import { sendPasswordResetEmail } from "firebase/auth";


// Component for displaying the forgot password form
export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    // Function for handling the form change
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    // Function for handling the form submit
    const sendForgotPasswordLink = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return (
        <GenericLoneDiv heading={"Forgot Password"}>
            <form onSubmit={sendForgotPasswordLink}>
                <InputElement type={"email"} name={"email"} value={email} heading={"Email"} handleChange={handleEmailChange} required/>
                <button>Send link</button>
            </form>
        </GenericLoneDiv>
    )
}