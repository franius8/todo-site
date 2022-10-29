import toDo from "./todo";
import idGenerator from "./idgenerator";
import dateFixer from "./datefixer";

const toDoManipulator = (() => {
  interface ToDo {
    heading: string;
    text: string;
    date: any;
    priority: string;
    iD: number;
    markAsDone: Function;
    getDoneStatus: Function;
  }

  let toDoAry:ToDo[] = [];

  const loadToDoAry = () => {
    toDoAry = JSON.parse(localStorage.getItem("todoary") || "[]");
    toDoAry.forEach((todo: ToDo) => {
      todo.date = dateFixer.fixDates(todo.date);
    })
  }

  console.log(toDoAry);
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
    localStorage.setItem('todoary', (JSON.stringify(toDoAry)));
  }
  const getToDoAry = () => toDoAry;
  return { createToDo, modifyToDo, deleteToDo, getToDoAry, loadToDoAry }
})();

export default toDoManipulator;