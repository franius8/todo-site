import toDo from "./todo";
import Project from "./project";
import idGenerator from "./idgenerator";
import dateFixer from "./datefixer";

const toDoManipulator = (() => {

  const toDoAry:ToDo[] = [];
  const doneAry:ToDo[] = [];
  const projectAry:Project[] = [];

  const loadToDoAry = () => {
    const rawToDoAry = JSON.parse(localStorage.getItem("todoary") || "[]");
    rawToDoAry.forEach((todo: ToDo) => {
    todo.date = dateFixer.fixDates(todo.date);
    toDoAry.push(toDo(todo.heading, todo.text, todo.date, todo.priority, todo.iD, todo.projectiDs));
    });
  }

  const loadDoneAry = () => {
    const rawDoneAry = JSON.parse(localStorage.getItem("doneary") || "[]");
    rawDoneAry.forEach((todo: ToDo) => {
      todo.date = dateFixer.fixDates(todo.date);
      doneAry.push(toDo(todo.heading, todo.text, todo.date, todo.priority, todo.iD, todo.projectiDs, true));
      });
  }

  const loadProjectAry = () => {
    const rawProjectAry = JSON.parse(localStorage.getItem("projectary") || "[]");
    rawProjectAry.forEach((project: RawProject) => {
      project.date = dateFixer.fixDates(project.date);
      project.toDos.forEach((todo: ToDo) => {
        todo.date = dateFixer.fixDates(todo.date);
        return todo;
        });
      projectAry.push(Project(project.iD, project.name, project.toDos, project.date, project.priority));
      });
  }

  const loadArys = () => {
    loadToDoAry();
    loadDoneAry();
    loadProjectAry();
  }

  const createToDo = (heading: string, text: string, date: Date, priority: string) => {
    const iD = idGenerator.generateID();
    const newToDo:ToDo = toDo(heading, text, date, priority, iD, []);
    toDoAry.push(newToDo);
    localStorage.setItem('todoary', (JSON.stringify(toDoAry)));
    return newToDo;
  }
  const modifyToDo = (id:number, newHeading: string = null, newText: string = null, newDate: Date = null, newPriority: string = null) => {
    const toDo:ToDo = toDoAry.find(x => x.iD === id);
    if (newHeading !== null) {
      toDo.heading = newHeading;
    }
    if (newText !== null) {
      toDo.text = newText;
    }
    if (newDate !== null) {
      toDo.date = newDate;
    }
    if (newPriority !== null) {
      toDo.priority = newPriority;
    }
  }
  const deleteToDo = ( id:number ) => {
    const toDo:ToDo = toDoAry.find(x => x.iD === id);
    if (toDo.projectiDs.length > 0) {
      toDo.projectiDs.forEach((projectiD) => {
        const project:Project = projectAry.find(x => x.iD === projectiD);
        const index = project.getToDos().indexOf(toDo);
        project.toDos.splice(index, 1);
      });
    }

    const index:number = toDoAry.findIndex(x => x.iD === id);
    toDoAry.splice(index, 1);
    localStorage.setItem('todoary', (JSON.stringify(toDoAry)));
    idGenerator.freeID(id);
  }

  const findTodDo = (id:number) => {
    return toDoAry.find(x => x.iD === id);
  }

  const moveToDone = (id:number) => {
    const index:number = toDoAry.findIndex(x => x.iD === id);
    const doneToDo = toDoAry.splice(index, 1)[0];
    console.log(doneToDo);
    doneToDo.markAsDone();
    localStorage.setItem('todoary', (JSON.stringify(toDoAry)));
    doneAry.push(doneToDo);
    localStorage.setItem('doneary', (JSON.stringify(doneAry)));
  }
  const createProject = (name:string, toDos:ToDo[], date: Date, priority: string) => {
    const iD = idGenerator.generateID();
    const newProject:Project = Project(iD, name, toDos, date, priority);
    projectAry.push(newProject);
    localStorage.setItem('projectary', (JSON.stringify(projectAry)));
    return newProject;
  }

  const modifyProject = (id:number, newName: string = null, newToDos:ToDo[] = null, newDate: Date = null, newPriority: string = null) => {
    const project:Project = projectAry.find(x => x.iD === id);
    if (newName !== null) {
      project.name = newName;
    }
    if (newToDos !== null) {
      project.setToDos(newToDos);
    }
    if (newDate !== null) {
      project.date = newDate;
    }
    if (newPriority !== null) {
      project.priority = newPriority;
    }
  }

  const deleteProject = (id:number) => {
    const index:number = projectAry.findIndex(x => x.iD === id);
    projectAry.splice(index, 1);
    localStorage.setItem('projectary', (JSON.stringify(projectAry)));
    idGenerator.freeID(id);
  }

  const findProject = (id:number) => {
    return projectAry.find(x => x.iD === id);
  }

  const getToDoAry = () => toDoAry;
  const getDoneAry = () => doneAry;
  const getProjectAry = () => projectAry;
  const updateProjectAry = () => {
    localStorage.setItem('projectary', (JSON.stringify(projectAry)));
  }
  return { 
    createToDo, 
    modifyToDo, 
    deleteToDo, 
    getToDoAry, 
    loadArys, 
    getDoneAry, 
    moveToDone, 
    findTodDo, 
    createProject,
    modifyProject, 
    getProjectAry,
    deleteProject,
    findProject,
    updateProjectAry }
})();

export default toDoManipulator;