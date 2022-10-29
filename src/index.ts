import domManipulator from './dom-manipulator';
import toDo from './todo';
import toDoManipulator from './todomanipulator';

interface ToDo {
  heading: string;
  text: string;
  date: Date;
  priority: string;
  iD: number;
  markAsDone: Function;
  getDoneStatus: Function;
}

domManipulator.homePageBuilder();
toDoManipulator.loadArys();
domManipulator.displayToDos(toDoManipulator.getToDoAry());
domManipulator.displayDoneToDos(toDoManipulator.getDoneAry());