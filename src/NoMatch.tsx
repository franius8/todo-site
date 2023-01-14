import React from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const MissingPageDiv = styled.div`
      margin: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    `


// Functon for displaying a 404 page when a user tries to access a page that doesn't exist
export default function NoMatch() {
    const navigate = useNavigate();

    // Helper function to redirect the user to the home page
    const backToHome = () => {
        navigate("/home");
    }

    return (
        <MissingPageDiv>
            404 - Page not found.
            <button onClick={backToHome}>
                Go to homepage
            </button>
        </MissingPageDiv>
    );
}