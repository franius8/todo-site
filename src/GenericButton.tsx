import React from "react";
import styled from "styled-components";

const GenericButtonElement = styled.button`
  border-radius: 1rem;
  border: 5px solid var(--main-color);
  background-color: var(--main-color);
  padding: 0.5rem 1rem;
  font-family: inherit;
  font-size: inherit;
  font-weight: bold;
  color: white;
  align-self: center;
  justify-self: center;
&:hover {
    cursor: pointer;
    background-color: white;
    color: var(--main-color);
    border: 5px solid var(--main-color);
}
`

const SecondaryButtonElement = styled.button`
  border-radius: 1rem;
  border: 5px solid var(--main-color);
  background-color: white;
  padding: 0.5rem 1rem;
  font-family: inherit;
  font-size: inherit;
  font-weight: bold;
  color: var(--main-color);
  align-self: center;
  justify-self: center;
  &:hover {
    background-color: var(--main-color);
    color: white;
    cursor: pointer;
  }
`

export default function GenericButton(props: {variantMain: boolean, type: "button" | "submit", form: string, children: React.ReactNode,
    onClick: () => void | null}) {
    if (props.variantMain) {
        return (
            <GenericButtonElement type={props.type} form={props.form} onClick={props.onClick}>
                {props.children}
            </GenericButtonElement>
        )
    } else {
        return (
            <SecondaryButtonElement type={props.type} form={props.form} onClick={props.onClick}>
                {props.children}
            </SecondaryButtonElement>
        )
    }
}