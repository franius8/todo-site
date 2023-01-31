import React from "react";
import { motion } from "framer-motion";
import { GrClose } from "react-icons/all";

// Generic component for modals
export default function GenericModal(props: {children: JSX.Element, id: string, close: () => void }) {

    // Object outlining modal animations
    const entryExitAnimation = {
        initial: { opacity: 0, top: "-50%", transition: { type: "spring" } },
        isOpen: { opacity: 1, top: "50%" },
        exit: { opacity: 0, top: "-50%" }
    };

    return (
        <motion.div className={"modaldiv fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border-2 border-gray-200" +
            " rounded-xl shadow-xl bg-white px-6 py-4"}
                    initial={"initial"}  animate={"isOpen"}  exit={"exit"}  variants={entryExitAnimation} id={props.id}>
            <div>
                <div className={"absolute right-4 top-4 p-2 bg-gray-200 rounded-full cursor-pointer"} onClick={props.close}>
                    <GrClose className={"pointer-events-auto"}/>
                </div>
            </div>
            {props.children}
        </motion.div>
    )
}