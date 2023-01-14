import React from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const MainLogoDiv = styled.div`
        display: flex;
        align-items: center;
        cursor: pointer;
    `;

const CheckMarkDiv = styled.div`
      background-color: var(--main-color);
      font-family: 'Sansita Swashed', cursive;
      color: white;
      padding: 0.2rem 0.8rem;
      border-radius: 1rem;
      font-size: 2rem;
    `;

const LogoText = styled.div`
      color: var(--main-color);
      font-weight: 900;
      font-family: 'Sansita Swashed', cursive;
      font-size: 2rem;
      padding: 1rem;
      line-height: 0;
    `;

export default function LogoDiv() {
    const navigate = useNavigate();

    const backToHome = () => {
        navigate("/home");
    }

    return (
        <MainLogoDiv onClick={backToHome}>
            <CheckMarkDiv>
                &#10003;
            </CheckMarkDiv>
            <LogoText>
                To Do
            </LogoText>
        </MainLogoDiv>
    );
}