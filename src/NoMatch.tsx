import React from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

export default function NoMatch() {
    const navigate = useNavigate();
    const backToHome = () => {
        navigate("/home");
    }

    const MissingPageDiv = styled.div`
      margin: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    `;

    return (
        <MissingPageDiv>
            404 - Page not found.
            <button onClick={backToHome}>
                Go to homepage
            </button>
        </MissingPageDiv>
    );
}