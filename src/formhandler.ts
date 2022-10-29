import formGetter from "./formgetter";
import domManipulator from "./dom-manipulator";
import toDoManipulator from "./todomanipulator";

const formHandler =(() => {
  const handleFormSubmission = (e:SubmitEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const targetParent = (<HTMLDivElement>(target.parentNode));
    const toDoData = formGetter.getFormData(target);
    target.reset();
    targetParent.style.display = 'none';
    toDoManipulator.createToDo(toDoData[0], toDoData[1], toDoData[2], toDoData[3]);
    domManipulator.displayToDos(toDoManipulator.getToDoAry());
  }
  const handleEditFormSubmission = (e:SubmitEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const toDoDiv = (<HTMLDivElement>(<HTMLDivElement>(target.parentNode)).parentNode);
    const toDoData = formGetter.getEditFormData(e);
    target.reset();
    toDoManipulator.modifyToDo(Number(toDoDiv.id), toDoData[0], toDoData[1], toDoData[2], toDoData[3]);
    domManipulator.displayToDos(toDoManipulator.getToDoAry());
  }
  return {handleFormSubmission, handleEditFormSubmission}
})();

export default formHandler