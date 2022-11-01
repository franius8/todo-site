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

toDoManipulator.loadArys();
domManipulator.homePageBuilder();
