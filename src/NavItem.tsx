import React from "react";
import {useNavigate} from "react-router-dom";

// Component for a single part of the top menu navigation bar
export default function NavItem(props: { text: string, icon: JSX.Element, active: string }) {
    const capitalizedLinkName = props.text.charAt(0).toUpperCase() + props.text.slice(1);
    const id = `${props.text}link`;
    const className = props.text === props.active ? "navitem bg-gray-200 transition-all first-of-type:rounded-l-xl " +
        "last-of-type:rounded-r-xl px-8 py-4 flex items-center justify-center gap-2" :
        "navitem bg-white transition-all first-of-type:rounded-l-xl last-of-type:rounded-r-xl p-4 " +
        "flex items-center justify-center gap-2 hover:bg-gray-200";
    const navigate = useNavigate();

    // Function to navigate to the correct page when the link is clicked
    const route = () => {
        navigate(`/${props.text}`);
    }
    return (
        <div className={className} onClick={route} id={id} role="button">
            <span className={"material-symbols-outlined"}>{props.icon}</span>
            <span className={"hidden lg:inline"}>{capitalizedLinkName}</span>
        </div>
    );
}