import toDoManipulator from "./todomanipulator";

const formGetter = (() => {
  const getFormData = (e:SubmitEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const toDoTitle:string = (<HTMLInputElement>(document.getElementById('todotitle'))).value;
    const toDoContent:string = (<HTMLInputElement>(document.getElementById('todocontent'))).value;
    const toDoDate:Date = new Date((<HTMLInputElement>(document.getElementById('tododate'))).value);
    const toDoPriority:string = (<HTMLInputElement>(document.querySelector('input[name="todopriority"]:checked'))).value;
    target.reset();
    return [toDoTitle, toDoContent, toDoDate, toDoPriority];
  }
  return { getFormData }
})();

export default formGetter;