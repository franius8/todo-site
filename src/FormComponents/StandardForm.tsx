import React from "react";
import GenericModal from "../GenericModal";

export default function StandardForm(props: { close: () => void, heading: string, children: JSX.Element,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void, submitText: string, id: string}) {

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