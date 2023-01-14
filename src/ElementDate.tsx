import React from "react";
import dateConverter from "./Modules/DateConverter";

// Coomponent for displaying the date and days left for a project or ToDo
export default function ElementDate(props: { date: string, done: boolean }) {
    return (
        <div className="tododate">
            <div><span className="material-symbols-outlined">calendar_month</span></div>
            <div className={new Date() > new Date(props.date) && !props.done ? "missedtodo" : ""}>
                {dateConverter.convertToString(new Date(props.date))}
                {props.done ? "" : ` (${dateConverter.getDayDifference(new Date(props.date))} days left)` }
            </div>
        </div>
    )
}