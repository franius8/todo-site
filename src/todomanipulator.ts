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
  let doneAry:ToDo[] = [];

  const loadToDoAry = () => {
    let rawToDoAry = JSON.parse(localStorage.getItem("todoary") || "[]");
    rawToDoAry.forEach((todo: ToDo) => {
    todo.date = dateFixer.fixDates(todo.date);
    toDoAry.push(toDo(todo.heading, todo.text, todo.date, todo.priority, todo.iD));
    });
  }

  const loadDoneAry = () => {
    doneAry = JSON.parse(localStorage.getItem("doneary") || "[]");
    doneAry.forEach((todo: ToDo) => {
      todo.date = dateFixer.fixDates(todo.date);
      });
  }

  const loadArys = () => {
    loadToDoAry();
    loadDoneAry();
  }

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
    idGenerator.freeID(id);
  }

  const findTodDo = (id:number) => {
    return toDoAry.find(x => x.iD === id);
  }

  const moveToDone = (id:number) => {
    const index:number = toDoAry.findIndex(x => x.iD === id);
    const doneToDo = toDoAry.splice(index, 1)[0];
    console.log(doneToDo);
    doneToDo.markAsDone();
    localStorage.setItem('todoary', (JSON.stringify(toDoAry)));
    toDoAry.push(doneToDo);
    localStorage.setItem('doneary', (JSON.stringify(toDoAry)));
  }

  const getToDoAry = () => toDoAry;
  const getDoneAry = () => doneAry;
  return { createToDo, modifyToDo, deleteToDo, getToDoAry, loadArys, getDoneAry, moveToDone, findTodDo }
})();

export default toDoManipulator;