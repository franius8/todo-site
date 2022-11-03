const formGetter = (() => {

  const getFormData = () => {
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
    const toDoData:[string, string, Date, string] = [toDoTitle, toDoContent, toDoDate, toDoPriority];
    return toDoData;
  }
  const getProjectFormData = () => {
    const projectName:string = (<HTMLInputElement>(document.getElementById('projectname'))).value;
    const projectDate:Date = new Date((<HTMLInputElement>(document.getElementById('projectdate'))).value);
    const projectPriority:string = (<HTMLInputElement>(document.querySelector('input[name="projectpriority"]:checked'))).value;
    const projectData:[string, Date, string] = [projectName, projectDate, projectPriority];
    return projectData;
  }
  const getProjectToDoData = (target:HTMLElement) => {
    const projectToDoFields = target.querySelectorAll('input[name="projectcheckbox"]:checked');
    const projectToDoIdsAry:number[] = Array.from(projectToDoFields).map((field:HTMLInputElement) => Number(field.value));
    console.log(projectToDoIdsAry);
    return projectToDoIdsAry;
  }
  const getProjectEditFormData = (e:SubmitEvent) => {
    const target = e.target as HTMLFormElement;
    const projectName:string = (<HTMLInputElement>(target.querySelector('#projectnameedit'))).value;
    const projectDate:Date = new Date((<HTMLInputElement>(target.querySelector('#projectdateedit'))).value);
    const projectPriority:string = (<HTMLInputElement>(target.querySelector('input[name="projectpriorityedit"]:checked'))).value;
    const projectData:[string, Date, string] = [projectName, projectDate, projectPriority];
    return projectData;
  }
  return { 
    getFormData, 
    getEditFormData, 
    getProjectFormData, 
    getProjectToDoData,
    getProjectEditFormData 
  }
})();

export default formGetter;