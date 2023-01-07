import React from "react";
import {useNavigate} from "react-router-dom";
import "./NoMatch.css";

export default function NoMatch() {
    const navigate = useNavigate();
    const backToHome = () => {
        navigate("/home");
    }
    return (
        <div id="missingpagediv">
            404 - Page not found.
            <button onClick={backToHome}>
                Go to homepage
            </button>
        </div>
    );
}