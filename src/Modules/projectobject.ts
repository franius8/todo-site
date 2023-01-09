import toDoManipulator from "./todomanipulator";
import { ToDoInterface } from "./d";

const projectobject = (iD: number, name:string, toDos:ToDoInterface[], date: Date, priority: string) => {
    const addToDo = (toDo:ToDoInterface) => {
        toDos.push(toDo);
        toDoManipulator.updateProjectAry();
    };
    const clearToDos = () => {
        toDos = [];
        toDoManipulator.updateProjectAry();
    };
    const getToDos = () => toDos;
    const setToDos = (newToDos:ToDoInterface[]) => {
        toDos = newToDos;
        toDoManipulator.updateProjectAry();
    };
    return { iD:iD, name:name, date:date, priority:priority, toDosAry:toDos, addToDo, clearToDos, getToDos, setToDos };
}

export default projectobject;
