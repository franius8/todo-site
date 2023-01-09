import React from "react";
import styled from "styled-components";
import RadioElement from "./RadioElement";
import './stylesheets/RadioInputElement.css'

const InputDiv = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.5rem;
`
// Styling for radiocontainer in separate CSS file due to complexity

export default function RadioInputElement(props: { name: string, values: string[], heading: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    const random = Math.random();

    return (
        <InputDiv>
            <label htmlFor={random.toString()}>{props.heading}:</label>
            <div className={"radiocontainer"} id={random.toString()}>
                {props.values.map((element) =>
                    <RadioElement name={props.name} value={element} handleChange={props.handleChange} key={element}/>)}
            </div>
        </InputDiv>
    )

}