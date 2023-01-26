import React from "react";
import {ProjectInterface} from "./Modules/d";
import dateConverter from "./Modules/DateConverter";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {priorityGetter} from "./Modules/priorityGetter";
import ElementDate from "./ElementDate";

const ProjectToDoContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`

const NoToDosDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

// Component for displaying project ToDos
export default function ProjectToDoContainer(props: { visible: boolean, openToDoForm: (project: ProjectInterface) => void, project: ProjectInterface }) {
    useDispatch();

    // Function for opening form for adding new ToDos to project
    const openToDoForm = () => {
        
        props.openToDoForm(props.project);
    }

    if (props.visible && props.project.toDosAry.length === 0) {
        return (
            <div className={"shadow-xl border-gray-200 border-t-2 rounded-b-xl"}>
                <ProjectToDoContainerDiv>
                    <NoToDosDiv>
                        <div className="notodos">No ToDos for this project yet</div>
                        <button className="bg-green-600 text-white font-bold rounded-xl p-3 border-4 border-green-600
                        hover:bg-white hover:text-green-600 hover:shadow-xl" onClick={openToDoForm}>Add/Remove ToDos</button>
                    </NoToDosDiv>
                </ProjectToDoContainerDiv>
            </div>
        );
    } else if (props.visible) {
        return (
            <div className={"shadow-xl border-gray-200 border-t-2 rounded-b-xl"}>
                <ProjectToDoContainerDiv>
                    <NoToDosDiv>
                        <button className="bg-green-600 text-white font-bold rounded-xl p-3 border-4 border-green-600
                        hover:bg-white hover:text-green-600 hover:shadow-xl" onClick={openToDoForm}>Add/Remove ToDos</button>
                    </NoToDosDiv>
                        {props.project.toDosAry.map(({iD, heading, text, priority, date}) => {
                            return (
                                <div className="projecttodo" key={`${props.project.iD} ${iD}`}>
                                    <div className="labelstripe" style={{backgroundColor: priorityGetter(priority)}} />
                                    <div className="todocontent">
                                        <div className="todoheading">{heading}</div>
                                        <div className="todotext">{text}</div>
                                        <div className="tododate">
                                            <ElementDate done={false} date={date} />
                                            <div>{date} ({dateConverter.getDayDifference(new Date(date))} days left)</div>
                                        </div>
                                        <div className="todopriority">
                                            <div className="prioritycircle" style={{backgroundColor: priorityGetter(priority)}} />
                                            <div>{priority} priority</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                        }

                </ProjectToDoContainerDiv>
            </div>
        )
    } else {
        return null;
    }
}