import React from 'react';
import Labelstripe from "./Labelstripe";
import Checkbox from "./Checkbox";
import ElementButtonDiv from "./ElementButtonDiv";
import DoneCheckbox from "./DoneCheckbox";

export default function GenericItemContainer(props: { children: React.ReactNode, done: boolean,
    priority: string, move: () => void, toggleEdit: () => void, delete: () => void}) {
    return (
        <div className="todo shadow-lg border-2 border-gray-200 rounded-xl transition-all hover:bg-gray-100">
            <Labelstripe priority={props.priority} />
            <div className="middlediv">
                {props.done ? <DoneCheckbox onClick={props.move}/> : <Checkbox onClick={props.move}/>}
                {props.children}
                <ElementButtonDiv toggleEdit={props.toggleEdit} delete={props.delete} />
            </div>
        </div>
    )
}