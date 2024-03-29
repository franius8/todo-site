import React from "react";

// Generic component for single form radio element
export default function RadioElement(props: { name: string, value: string, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) {

    return (
        <>
            <input type="radio" name={props.name} value={props.value} id={props.value} onChange={props.handleChange}/>
            <label htmlFor={props.value}>{props.value}</label>
        </>
    )
}