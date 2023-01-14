import { ToDoInterface } from "./d";

const projectobject = (iD: number, name:string, toDos:ToDoInterface[], date: string, priority: string) => {
    return { iD:iD, name:name, date:date, priority:priority, toDosAry:toDos };
}

export default projectobject;
