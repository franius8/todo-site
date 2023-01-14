import React from "react";
import GenericModal from "./GenericModal";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {toggleModal} from "../Redux/modalSlice";

const ButtonDiv = styled.div`
    display: flex;
`

// Generic component for confirmation modal
export default function ConfirmModal(props: { id: string, close: () => void, confirm: () => void, text: string,
    header: string, innerText: string, onConfirm: () => void }) {
    const dispatch = useDispatch();

    return (
        <GenericModal id={"confirmmodal"} close={() => {dispatch(toggleModal())}}>
            <div>
                <h2>{props.header}</h2>
                <p>{props.innerText}</p>
                <ButtonDiv>
                    <button className={"genericbutton"} onClick={() => dispatch(toggleModal())}>Cancel</button>
                    <button className={"genericbutton"} onClick={props.confirm}>Confirm</button>
                </ButtonDiv>
            </div>
        </GenericModal>
    )
}