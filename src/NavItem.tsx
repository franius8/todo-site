import React from "react";
import {useNavigate} from "react-router-dom";

export default function NavItem(props: { text: string, icon: string, active: string }) {
    const capitalizedLinkName = props.text.charAt(0).toUpperCase() + props.text.slice(1);
    const id = props.text + "link";
    const className = props.text === props.active ? "navitem active" : "navitem";
    const navigate = useNavigate();
    const route = () => {
        navigate("/" + props.text);
    }
    return (
        <div className={className} onClick={route} id={id}>
            <span className={"material-symbols-outlined"}>{props.icon}</span> {capitalizedLinkName}
        </div>
    );
}