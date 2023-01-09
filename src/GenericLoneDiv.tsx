import React from "react";
import styled from "styled-components";
import LogoDiv from "./LogoDiv";

const MainDiv = styled.div`
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      border: 3px solid var(--light-gray);
      padding: 1rem 2rem;
      border-radius: 1rem;
      h2 {
        margin: 0;
      }
    `;

export default function GenericLoneDiv(props: { children: JSX.Element }) {
    return (
        <MainDiv>
            <LogoDiv />
            {props.children}
        </MainDiv>
    )
}