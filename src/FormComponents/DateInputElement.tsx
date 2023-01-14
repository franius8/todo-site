import React from "react";
import InputElement from "./InputElement";

// Generic component for date input elements
export default function DateInputElement(props: { name: string, value: string, heading: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, required: boolean}) {

    return (
        <InputElement type={"date"} name={props.name} value={props.value} heading={props.heading}
                      handleChange={props.handleChange} required={props.required}/>
    )
}