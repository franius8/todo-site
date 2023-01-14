import React from "react";
import styled from "styled-components";

const InputDiv = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.5rem;
    `

// Generic component for form input elements
export default function InputElement(props: { type: string, name: string, value: string, heading: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, required: boolean}) {

    return (
        <InputDiv>
            <label htmlFor={props.name}>
                {props.heading}:
            </label>
            <input type={props.type} name={props.name} id={props.name} required={props.required}
                   value={props.value} onChange={props.handleChange}/>
        </InputDiv>
    )
}