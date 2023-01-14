import React, { useState } from "react";
import { auth } from "./Modules/firebase";
import GenericLoneDiv from "./GenericLoneDiv";
import InputElement from "./FormComponents/InputElement";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

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
        <GenericLoneDiv>
            <>
                <h2>Forgot Password</h2>
                <form onSubmit={sendForgotPasswordLink}>
                    <InputElement type={"email"} name={"email"} value={email} heading={"Email"} handleChange={handleEmailChange} required/>
                    <button>Send link</button>
                </form>
            </>
        </GenericLoneDiv>
    )
}