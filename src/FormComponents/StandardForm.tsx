import React from "react";
import GenericModal from "../Modals/GenericModal";
import GenericButton from "../GenericButton";

// Generic component for form elements
export default function StandardForm(props: { close: () => void, heading: string, children: JSX.Element,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void, submitText: string, id: string}) {

    return (
        <GenericModal id={props.id} close={props.close}>
            <>
                <h2 className={"font-bold py-2"}>{props.heading}</h2>
                <form id={"newtodoform"} className={"p-1"} onSubmit={props.onSubmit}>
                    {props.children}
                    <GenericButton type="submit" form={"newtodoform"} onClick={() => {}} variantMain={true}>{props.submitText}</GenericButton>
                </form>
            </>
        </GenericModal>
    )
}