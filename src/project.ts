import toDoManipulator from "./todomanipulator";

const Project = (iD: number, name:string, toDos:ToDo[], date: Date, priority: string) => {
  let toDosAry = toDos;
  const addToDo = (toDo:ToDo) => {
    toDosAry.push(toDo)
    toDoManipulator.updateProjectAry();
  };
  const clearToDos = () => {
    toDosAry = [];
    toDoManipulator.updateProjectAry();
  };
  const getToDos = () => toDosAry;
  const setToDos = (toDos:ToDo[]) => toDosAry = toDos;
  return { iD, name, date, priority, toDos, addToDo, clearToDos, getToDos, setToDos };
}

export default Project;