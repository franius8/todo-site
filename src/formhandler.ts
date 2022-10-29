import formGetter from "./formgetter";
import domManipulator from "./dom-manipulator";
import toDoManipulator from "./todomanipulator";

const formHandler =(() => {
  const handleFormSubmission = (e:SubmitEvent) => {
    const toDoData = formGetter.getFormData(e);
    toDoManipulator.createToDo(toDoData[0], toDoData[1], toDoData[2], toDoData[3]);
    domManipulator.displayToDos(toDoManipulator.getToDoAry());
  }
  return {handleFormSubmission}
})();

export default formHandler