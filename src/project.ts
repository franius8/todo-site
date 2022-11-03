import toDoManipulator from "./todomanipulator";

const Project = (iD: number, name:string, toDos:ToDo[], date: Date, priority: string) => {
  const addToDo = (toDo:ToDo) => {
    toDos.push(toDo);
    toDoManipulator.updateProjectAry();
  };
  const clearToDos = () => {
    toDos = [];
    toDoManipulator.updateProjectAry();
  };
  const getToDos = () => toDos;
  const setToDos = (newToDos:ToDo[]) => {
    toDos = newToDos;
    toDoManipulator.updateProjectAry();
  };
  return { iD:iD, name:name, date:date, priority:priority, toDosAry:toDos, addToDo, clearToDos, getToDos, setToDos };
}

export default Project;