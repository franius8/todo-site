import React from "react";
import styled from "styled-components";

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

// A generic button used in the app
export default function GenericButton(props: {variantMain: boolean, type: "button" | "submit", form: string, children: React.ReactNode,
    onClick: (() => void) | undefined}) {

    interface ButtonProps {
        className: string,
        type: "button" | "submit",
        form: string,
        onClick?: (() => void)
    }

    const buttonProps: ButtonProps = {
        className: "py-1 px-6 font-bold self-center justify-self-center border-green-600 border-4 cursor-pointer " +
                    "text-white text-lg rounded-xl bg-green-600 transition-all hover:shadow-xl" +
                " hover:bg-white hover:text-green-600",
        type: props.type,
        form: props.form
    }

    if (props.onClick) {
        console.log("test0");
        buttonProps.onClick = props.onClick
    }

    if (props.variantMain) {
        return (
            <button {...buttonProps}>
                {props.children}
            </button>
        )
    } else {
        return (
            <button className={"py-1 px-6 font-bold self-center justify-self-center border-green-600 border-4 cursor-pointer " +
                "text-green-600 text-lg rounded-xl bg-white transition-all hover:shadow-xl hover:bg-green-600 hover:text-white"}
                    type={props.type} form={props.form} onClick={onclick !== undefined ? props.onClick : undefined}>
                {props.children}
            </button>
        )
    }
}