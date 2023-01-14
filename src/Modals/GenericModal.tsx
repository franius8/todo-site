import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const ModalDiv = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  background-color: white;
  padding: 1rem 2rem;
  border-radius: 1rem;
  border: 1px solid var(--light-gray);
  z-index: 10;
  min-width: 30rem;
`;

const CloseButtonDiv = styled.div`
      padding: 0.5rem;
      float: right;
`;

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
`;

const CloseButtonIcon = styled.span`
        line-height: 2rem;
        height: 2rem;
        width: 2rem;
`;

export default function GenericModal(props: {children: JSX.Element, id: string, close: () => void }) {

    const entryExitAnimation = {
        initial: { opacity: 0, top: "-50%", transition: { type: "spring" } },
        isOpen: { opacity: 1, top: "50%" },
        exit: { opacity: 0, top: "-50%" }
    };

    return (
        <ModalDiv className={"modaldiv"} initial={"initial"}  animate={"isOpen"}  exit={"exit"}  variants={entryExitAnimation} id={props.id}>
            <CloseButtonDiv>
                <CloseButton onClick={props.close}>
                    <CloseButtonIcon className="material-symbols-outlined">close</CloseButtonIcon>
                </CloseButton>
            </CloseButtonDiv>
            {props.children}
        </ModalDiv>
    )
}