import React from "react";
import {ProjectInterface} from "./Modules/d";
import dateConverter from "./Modules/DateConverter";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const ProjectToDoDiv = styled.div`
  border-radius: 0 0 1rem 1rem;
  border: 1px solid var(--light-gray);
  box-shadow: 3px 3px 3px rgb(150, 150, 150);
  background-color: white;
  z-index: 1;  
`

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

export default function ProjectToDoContainer(props: { visible: boolean, openToDoForm: (project: ProjectInterface) => void, project: ProjectInterface }) {
    const dispatch = useDispatch();
    const determinePriorityColor = (priority: string) => {
        if (priority === "High") {
            return "red";
        } else if (priority === "Medium") {
            return "yellow";
        } else {
            return "green";
        }
    }

    const openToDoForm = () => {
        
        props.openToDoForm(props.project);
    }

    if (props.visible && props.project.toDosAry.length == 0) {
        return (
            <ProjectToDoDiv>
                <ProjectToDoContainerDiv>
                    <NoToDosDiv>
                        <div className="notodos">No ToDos for this project yet</div>
                        <button className="addtodobutton" onClick={openToDoForm}>Add/Remove ToDos</button>
                    </NoToDosDiv>
                </ProjectToDoContainerDiv>
            </ProjectToDoDiv>
        );
    } else if (props.visible) {
        return (
            <ProjectToDoDiv>
                <ProjectToDoContainerDiv>
                    <NoToDosDiv>
                        <button className="addtodobutton" onClick={openToDoForm}>Add/Remove ToDos</button>
                    </NoToDosDiv>
                        {props.project.toDosAry.map(({iD, heading, text, priority, date}, index) => {
                            return (
                                <div className="projecttodo" key={props.project.iD + " " + iD}>
                                    <div className="labelstripe" style={{backgroundColor: determinePriorityColor(priority)}} />
                                    <div className="todocontent">
                                        <div className="todoheading">{heading}</div>
                                        <div className="todotext">{text}</div>
                                        <div className="tododate">
                                            <div><span className="material-symbols-outlined">calendar_month</span></div>
                                            <div>{date} ({dateConverter.getDayDifference(new Date(date))} days left)</div>
                                        </div>
                                        <div className="todopriority">
                                            <div className="prioritycircle" style={{backgroundColor: determinePriorityColor(priority)}} />
                                            <div>{priority} priority</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                        }

                </ProjectToDoContainerDiv>
            </ProjectToDoDiv>
        )
    } else {
        return null;
    }
}