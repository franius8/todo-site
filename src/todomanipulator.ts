import toDo from "./todo";
import idGenerator from "./idgenerator";

const toDoManipulator = (() => {
  interface ToDo {
    heading: string;
    text: string;
    date: Date;
    priority: string;
    iD: number;
    markAsDone: Function;
    getDoneStatus: Function;
  }
  const toDoAry:ToDo[] = [];
  const createToDo = (heading: string, text: string, date: Date, priority: string) => {
    const iD = idGenerator.generateID();
    const newToDo:ToDo = toDo(heading, text, date, priority, iD);
    toDoAry.push(newToDo);
    localStorage.setItem('todoary', (JSON.stringify(toDoAry)));
    return newToDo;
  }
  const modifyToDo = (id:number, heading: string = null, text: string = null, date: Date = null, priority: string = null) => {
    const toDo:ToDo = toDoAry.find(x => x.iD === id);
    if (heading !== null) {
      toDo.heading = heading;
    }
    if (text !== null) {
      toDo.text = text;
    }
    if (date !== null) {
      toDo.date = date;
    }
    if (priority !== null) {
      toDo.priority = priority;
    }
  }
  const deleteToDo = ( id:number ) => {
    const index:number = toDoAry.findIndex(x => x.iD === id);
    toDoAry.splice(index, 1);
  }
  const getToDoAry = () => toDoAry;
  return { createToDo, modifyToDo, deleteToDo, getToDoAry }
})();

export default toDoManipulator;