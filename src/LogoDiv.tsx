import React from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";

const LogoText = styled.div`
      font-family: 'Sansita Swashed', cursive;
      padding: 1rem;
      line-height: 0;
    `;

// Generic Logo Component
export default function LogoDiv() {
    const navigate = useNavigate();

    // Navigate to home page
    const backToHome = () => {
        navigate("/home");
    }

    return (
        <div onClick={backToHome} className={"flex items-center cursor-pointer gap-3"}>
            <div className={"bg-green-600 aspect-square text-4xl text-white rounded-xl p-3"}>
                <FaCheck />
            </div>
            <div className={"text-green-600 font-extrabold text-4xl font-sansita hidden lg:block"}>
                To Do
            </div>
        </div>
    );
}