import formGetter from "./formgetter";
import domManipulator from "./dom-manipulator";
import toDoManipulator from "./todomanipulator";

const formHandler =(() => {
  const handleFormSubmission = (e:SubmitEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const targetParent = (<HTMLDivElement>(target.parentNode));
    const toDoData = formGetter.getFormData();
    target.reset();
    targetParent.style.display = 'none';
    toDoManipulator.createToDo(toDoData[0], toDoData[1], toDoData[2], toDoData[3]);
    domManipulator.displayToDos(toDoManipulator.getToDoAry());
  }
  const handleToDoEditFormSubmission = (e:SubmitEvent, type: string) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const toDoDiv = (<HTMLDivElement>(<HTMLDivElement>(<HTMLDivElement>(target.parentNode)).parentNode).parentNode);
    const toDoData = formGetter.getEditFormData(e);
    target.reset();
    if (type === 'todo') {
      toDoManipulator.modifyToDo(Number(toDoDiv.id), toDoData[0], toDoData[1], toDoData[2], toDoData[3]);
      domManipulator.displayToDos(toDoManipulator.getToDoAry());
    } else {
      toDoManipulator.modifyDone(Number(toDoDiv.id), toDoData[0], toDoData[1], toDoData[2], toDoData[3]);
      domManipulator.displayDoneToDos(toDoManipulator.getDoneAry());
    }  
  }
  const handleNewProjectFormSubmission = (e:SubmitEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const targetParent = (<HTMLDivElement>(target.parentNode));
    const projectData = formGetter.getProjectFormData();
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
    targetParent.remove();
    const project:Project = toDoManipulator.findProject(iD);
    project.toDosAry = [];
    projectToDoIds.forEach((toDoId) => {
      project.addToDo(toDoManipulator.findTodDo(toDoId));
  });
  toDoManipulator.updateProjectAry();
  }
  
  const handleProjectEditFormSubmission = (e:SubmitEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const projectDiv = (<HTMLDivElement>(<HTMLDivElement>(<HTMLDivElement>(target.parentNode)).parentNode).parentNode);
    const projectData = formGetter.getProjectEditFormData(e);
    target.reset();
    toDoManipulator.modifyProject(Number(projectDiv.id), projectData[0], null, projectData[1], projectData[2]);
    domManipulator.displayProjects(toDoManipulator.getProjectAry());
  }

  return {
    handleFormSubmission, 
    handleToDoEditFormSubmission, 
    handleNewProjectFormSubmission, 
    handleAddProjectToDosFormSubmission,
    handleProjectEditFormSubmission
  };
})();

export default formHandler