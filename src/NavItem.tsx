import React from "react";
import {useNavigate} from "react-router-dom";

// Component for a signgle part of the top menu navigation bar
export default function NavItem(props: { text: string, icon: string, active: string }) {
    const capitalizedLinkName = props.text.charAt(0).toUpperCase() + props.text.slice(1);
    const id = `${props.text}link`;
    const className = props.text === props.active ? "navitem active" : "navitem";
    const navigate = useNavigate();

    // Function to navigate to the correct page when the link is clicked
    const route = () => {
        navigate(`/${props.text}`);
    }
    return (
        <div className={className} onClick={route} id={id} role="button">
            <span className={"material-symbols-outlined"}>{props.icon}</span> {capitalizedLinkName}
        </div>
    );
}