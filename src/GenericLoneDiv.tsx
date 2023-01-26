import React from "react";
import LogoDiv from "./LogoDiv";

// A generic component for use in single-div pages with a logo and a title
export default function GenericLoneDiv(props: { children: JSX.Element, heading: string }) {
    return (
        <div className={"gap-4 border-2 border-gray-200 rounded-xl shadow-xl p-10 m-auto flex flex-col justify-center items-center"}>
            <LogoDiv />
            <h2 className={"font-bold"}>{props.heading}</h2>
            {props.children}
        </div>
    )
}