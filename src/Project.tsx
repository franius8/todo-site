import React from "react";
import {ProjectInterface} from "./d";

export default function Project(props: { project: ProjectInterface }) {
    return (
        <div className="project">
            <div className="projecttitle">
                {props.project.name}
            </div>
            <div className="projectdescription">
                {props.project.priority}
            </div>
        </div>
    );
}