const formGetter = (() => {
  const getFormData = (target:HTMLElement) => {
    const toDoTitle:string = (<HTMLInputElement>(document.getElementById('todotitle'))).value;
    const toDoContent:string = (<HTMLInputElement>(document.getElementById('todocontent'))).value;
    const toDoDate:Date = new Date((<HTMLInputElement>(document.getElementById('tododate'))).value);
    const toDoPriority:string = (<HTMLInputElement>(document.querySelector('input[name="todopriority"]:checked'))).value;
    const toDoData:[string, string, Date, string] = [toDoTitle, toDoContent, toDoDate, toDoPriority]
    return toDoData;
  }
  const getEditFormData = (e:SubmitEvent) => {
    const target = e.target as HTMLFormElement;
    const toDoTitle:string = (<HTMLInputElement>(target.querySelector('#todotitleedit'))).value;
    const toDoContent:string = (<HTMLInputElement>(target.querySelector('#todocontentedit'))).value;
    const toDoDate:Date = new Date((<HTMLInputElement>(target.querySelector('#tododateedit'))).value);
    const toDoPriority:string = (<HTMLInputElement>(target.querySelector('input[name="todopriorityedit"]:checked'))).value;
    target.reset();
    const toDoData:[string, string, Date, string] = [toDoTitle, toDoContent, toDoDate, toDoPriority];
    return toDoData;
  }
  const getProjectFormData = (e:SubmitEvent) => {
    const target = e.target as HTMLFormElement;
    const projectName:string = (<HTMLInputElement>(document.getElementById('projectname'))).value;
    const projectDate:Date = new Date((<HTMLInputElement>(document.getElementById('projectdate'))).value);
    const projectPriority:string = (<HTMLInputElement>(document.querySelector('input[name="projectpriority"]:checked'))).value;
    target.reset();
    const projectData:[string, Date, string] = [projectName, projectDate, projectPriority];
    return projectData;
  }
  const getProjectToDoData = (target:HTMLElement) => {
    const projectToDoFields = target.querySelectorAll('input[name="projectcheckbox"]:checked');
    const projectToDoIdsAry:number[] = Array.from(projectToDoFields).map((field:HTMLInputElement) => Number(field.value));
    console.log(projectToDoIdsAry);
    return projectToDoIdsAry;
  }
  return { getFormData, getEditFormData, getProjectFormData, getProjectToDoData }
})();

export default formGetter;