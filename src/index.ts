import domManipulator from './dom-manipulator';
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

//toDoManipulator.createToDo('lorem ipsum', 'lorem ipsum', new Date(2022, 11, 14), 'High');
//toDoManipulator.createToDo('lorem ipsum', 'lorem ipsum', new Date(2022, 9, 28), 'Standard');
//toDoManipulator.createToDo('lorem ipsum', 'lorem ipsum', new Date(2022, 10, 4), 'Low');

domManipulator.homePageBuilder();
toDoManipulator.loadArys();
domManipulator.displayToDos(toDoManipulator.getToDoAry());