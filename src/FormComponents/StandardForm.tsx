import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import GenericModal from "../GenericModal";

const CloseButtonDiv = styled.div`
      padding: 0.5rem;
      float: right;
    `

const CloseButton = styled.button`
      border-radius: 50%;
      border: 1px solid var(--light-gray);
      background-color: var(--light-gray);
      height: 2rem;
      width: 2rem;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      `

const CloseButtonIcon = styled.span`
        line-height: 2rem;
        height: 2rem;
        width: 2rem;
      `

export default function StandardForm(props: { close: () => void, heading: string, children: JSX.Element,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void, submitText: string, id: string}) {


    const entryExitAnimation = {
        initial: { opacity: 0, top: "-50%", transition: { type: "spring" } },
        isOpen: { opacity: 1, top: "50%" },
        exit: { opacity: 0, top: "-50%" }
    };


    return (
        <GenericModal id={props.id} close={props.close}>
            <>
                <h2>{props.heading}</h2>
                <form onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit">{props.submitText}</button>
                </form>
            </>
        </GenericModal>
    )
}