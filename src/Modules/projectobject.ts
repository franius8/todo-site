import { ToDoInterface } from "./d";

// A generic object used for Projects
const projectobject = (iD: number, name:string, toDosAry:ToDoInterface[], date: string, priority: string) => {
    return { iD, name, date, priority, toDosAry };
}

export default projectobject;
