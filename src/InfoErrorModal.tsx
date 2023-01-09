import React from "react";
import GenericModal from "./GenericModal";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "./Redux/modalSlice";

export default function InfoErrorModal(props: { close: () => void, text: string, visible: boolean}) {
    const dispatch = useDispatch()
    const modalVisible = useSelector((state: { modal: { modalVisible: boolean } }) => state.modal.modalVisible)
    const modalText = useSelector((state: { modal: { modalText: string } }) => state.modal.modalText)

    if (modalVisible) {
        return (
            <GenericModal id={"infoerrormodal"} close={props.close}>
                <div>
                    <h2>Info</h2>
                    <p>{modalText}</p>
                    <button className={"genericbutton"} onClick={() => dispatch(toggleModal())}>OK</button>
                </div>
            </GenericModal>
        )
    } else {
        return null;
    }
}