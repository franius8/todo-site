import domManipulator from './dom-manipulator';
import toDo from './todo';

const toDoOne = toDo('lorem ipsum', 'lorem ipsum', new Date(2022, 9, 14), 'High');
const toDoTwo = toDo('lorem ipsum', 'lorem ipsum', new Date(2022, 9, 28), 'Standard');
const toDoThree = toDo('lorem ipsum', 'lorem ipsum', new Date(2022, 10, 4), 'Low');

domManipulator.homePageBuilder();
domManipulator.toDoBuilder(toDoOne);
domManipulator.toDoBuilder(toDoTwo);
domManipulator.toDoBuilder(toDoThree);
domManipulator.formBuilder();