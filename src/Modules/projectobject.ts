import { ToDoInterface } from "./d";

const projectobject = (iD: number, name:string, toDosAry:ToDoInterface[], date: string, priority: string) => {
    return { iD, name, date, priority, toDosAry };
}

export default projectobject;
