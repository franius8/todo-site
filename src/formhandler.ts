import domManipulator from "./dom-manipulator";
import toDoManipulator from "./todomanipulator";

const formHandler =(() => {
  const handleFormSubmission = (e:SubmitEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const targetParent = (<HTMLDivElement>(target.parentNode));
    const formData = new FormData(target);
    const data = Object.fromEntries(formData);
    target.reset();
    targetParent.style.display = 'none';
    console.log(data);
    toDoManipulator.createToDo(
      data.todotitle as string, 
      data.todocontent as string, 
      new Date(data.tododate as string), 
      data.todopriority as string);
    domManipulator.displayToDos(toDoManipulator.getToDoAry());
  }

  const handleToDoEditFormSubmission = (e:SubmitEvent, type: string) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const toDoDiv = (<HTMLDivElement>(<HTMLDivElement>(<HTMLDivElement>(target.parentNode)).parentNode).parentNode);
    const formData = new FormData(target);
    const data = Object.fromEntries(formData);
    target.reset();
    if (type === 'todo') {
      toDoManipulator.modifyToDo(
      Number(toDoDiv.id), 
      data.todotitleedit as string, 
      data.todocontentedit as string, 
      new Date(data.tododateedit as string), 
      data.todopriorityedit as string);
      domManipulator.displayToDos(toDoManipulator.getToDoAry());
    } else {
      toDoManipulator.modifyDone(
        Number(toDoDiv.id), 
        data.todotitleedit as string, 
        data.todocontentedit as string, 
        new Date(data.tododateedit as string), 
        data.todopriorityedit as string
      );
      domManipulator.displayDoneToDos(toDoManipulator.getDoneAry());
    }  
  }

  const handleNewProjectFormSubmission = (e:SubmitEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const targetParent = (<HTMLDivElement>(target.parentNode));
    const formData = new FormData(target);
    const data = Object.fromEntries(formData);
    target.reset();
    targetParent.style.display = 'none';
    toDoManipulator.createProject(
      data.projectname as string, 
      [], 
      new Date(data.projectdate as string), 
      data.projectpriority as string);
    domManipulator.displayProjects(toDoManipulator.getProjectAry());
  }

  const handleAddProjectToDosFormSubmission = (e:SubmitEvent, iD:number) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const targetParent = (<HTMLDivElement>(target.parentNode));
    const formData = new FormData(target);
    const projectToDoIds = formData.getAll('projectcheckbox').map((value) => Number(value));
    target.reset()
    targetParent.remove();
    const project:Project = toDoManipulator.findProject(iD) as Project;
    project.toDosAry = [];
    projectToDoIds.forEach((toDoId) => {
      project.addToDo(toDoManipulator.findTodDo(toDoId) as ToDo);
  });
  toDoManipulator.updateProjectAry();
  }
  
  const handleProjectEditFormSubmission = (e:SubmitEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const projectDiv = (<HTMLDivElement>(<HTMLDivElement>(<HTMLDivElement>(target.parentNode)).parentNode).parentNode);
    const formData = new FormData(target);
    const data = Object.fromEntries(formData);
    target.reset();
    toDoManipulator.modifyProject(
      Number(projectDiv.id), 
      data.projectnameedit as string,
      null, new Date(data.projectdateedit as string), 
      data.projectpriorityedit as string);
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