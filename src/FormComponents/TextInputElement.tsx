import React from "react";
import InputElement from "./InputElement";

// Generic component for form text input element
export default function TextInputElement(props: { name: string, value: string, heading: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, required: boolean}) {


    return (
        <InputElement type={"text"} name={props.name} value={props.value} heading={props.heading}
                      handleChange={props.handleChange} required={props.required}/>
    )
}