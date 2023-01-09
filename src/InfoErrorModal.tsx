import React from "react";
import GenericModal from "./GenericModal";

export default function InfoErrorModal(props: { close: () => void, text: string}) {
    return (
        <div>
            <GenericModal id={"infoerrormodal"} close={props.close}>
                <>
                    <div>{props.text}</div>
                    <button onClick={props.close}>OK</button>
                </>
            </GenericModal>
        </div>
    )
}