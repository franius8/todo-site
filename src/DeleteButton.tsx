import React from "react";

export default function DeleteButton(props: {children: React.ReactNode, onClick: () => void}) {
    return (
        <button className={"py-1 px-6 font-bold self-center justify-self-center border-red-600 border-4 cursor-pointer " +
            "text-white text-lg rounded-xl bg-red-600 transition-all hover:shadow-xl hover:bg-white hover:text-red-600"}
                onClick={props.onClick}>
            {props.children}
        </button>
    )
}