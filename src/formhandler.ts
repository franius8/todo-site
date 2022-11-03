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
    const toDoDiv = (<HTMLDivElement>(<HTMLDivElement>(<HTMLDivElement>(target.parentNode)).parentNode).parentNode);
    const toDoData = formGetter.getEditFormData(e);
    target.reset();
    toDoManipulator.modifyToDo(Number(toDoDiv.id), toDoData[0], toDoData[1], toDoData[2], toDoData[3]);
    domManipulator.displayToDos(toDoManipulator.getToDoAry());
  }
  const handleNewProjectFormSubmission = (e:SubmitEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const targetParent = (<HTMLDivElement>(target.parentNode));
    const projectData = formGetter.getProjectFormData(e);
    target.reset();
    targetParent.style.display = 'none';
    toDoManipulator.createProject(projectData[0], [], projectData[1], projectData[2]);
    domManipulator.displayProjects(toDoManipulator.getProjectAry());
  }
  const handleAddProjectToDosFormSubmission = (e:SubmitEvent, iD:number) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const targetParent = (<HTMLDivElement>(target.parentNode));
    const projectToDoIds = formGetter.getProjectToDoData(target);
    target.reset()
    targetParent.style.display = 'none';
    const project:Project = toDoManipulator.findProject(iD);
    project.clearToDos();
    projectToDoIds.forEach((toDoId) => {
      project.addToDo(toDoManipulator.findTodDo(toDoId));
  });
  }

  return {handleFormSubmission, handleEditFormSubmission, handleNewProjectFormSubmission, handleAddProjectToDosFormSubmission}
})();

export default formHandler