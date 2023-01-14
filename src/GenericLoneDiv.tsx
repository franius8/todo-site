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


// A generic component for use in single-div pages with a logo and a title
export default function GenericLoneDiv(props: { children: JSX.Element, heading: string }) {
    return (
        <MainDiv>
            <LogoDiv />
            <h2>{props.heading}</h2>
            {props.children}
        </MainDiv>
    )
}