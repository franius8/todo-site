import dateFixer from "./datefixer";
import projectobject from "./projectobject";
import todoObject from "./todoObject";
import idGenerator from "./idGenerator";
import { ToDoInterface, ProjectInterface, RawProject, generalObject } from "./d";

const toDoManipulator = (() => {
    const toDoAry:ToDoInterface[] = [];
    const doneAry:ToDoInterface[] = [];
    const projectAry:ProjectInterface[] = [];

    const loadToDoAry = () => {
        const rawToDoAry = JSON.parse(localStorage.getItem("todoary") || "[]");
        rawToDoAry.forEach((todo: ToDoInterface) => {
            todo.date = dateFixer.fixDates(todo.date);
            toDoAry.push(todoObject(todo.heading, todo.text, todo.date, todo.priority, todo.iD, todo.projectiDs));
        });
    }

    const loadDoneAry = () => {
        const rawDoneAry = JSON.parse(localStorage.getItem("doneary") || "[]");
        rawDoneAry.forEach((todo: ToDoInterface) => {
            todo.date = dateFixer.fixDates(todo.date);
            doneAry.push(todoObject(todo.heading, todo.text, todo.date, todo.priority, todo.iD, todo.projectiDs, true));
        });
    }

    const loadProjectAry = () => {
        const rawProjectAry = JSON.parse(localStorage.getItem("projectary") || "[]");
        rawProjectAry.forEach((project: RawProject) => {
            project.date = dateFixer.fixDates(project.date);
            project.toDosAry.forEach((todo: ToDoInterface) => {
                todo.date = dateFixer.fixDates(todo.date);
                return todo;
            });
            projectAry.push(projectobject(project.iD, project.name, project.toDosAry, project.date, project.priority));
        });
    }

    const loadArys = () => {
        loadToDoAry();
        loadDoneAry();
        loadProjectAry();
    }

    const createToDo = (heading: string, text: string, date: Date, priority: string) => {
        const iD = idGenerator.generateID();
        const newToDo:ToDoInterface = todoObject(heading, text, date, priority, iD, []);
        toDoAry.push(newToDo);
        localStorage.setItem('todoary', (JSON.stringify(toDoAry)));
        return newToDo;
    }

    const modifyToDo = (id:number, newHeading: string | null = null, newText: string | null = null, newDate: Date | null = null, newPriority: string | null = null) => {
        const toDo:ToDoInterface = toDoAry.find(x => x.iD === id) as ToDoInterface;
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
        localStorage.setItem('todoary', (JSON.stringify(toDoAry)));
    }

    const modifyDone = (id:number, newHeading: string | null = null, newText: string | null = null, newDate: Date | null = null, newPriority: string | null = null) => {
        const toDo:ToDoInterface = doneAry.find(x => x.iD === id) as ToDoInterface;
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
        localStorage.setItem('doneary', (JSON.stringify(doneAry)));
    }

    const deleteToDo = ( id:number ) => {
        const toDo:ToDoInterface = toDoAry.find(x => x.iD === id) as ToDoInterface;
        if (toDo.projectiDs.length > 0) {
            toDo.projectiDs.forEach((projectiD) => {
                const project:ProjectInterface = projectAry.find(x => x.iD === projectiD) as ProjectInterface;
                const index = project.getToDos().indexOf(toDo);
                project.getToDos().splice(index, 1);
            });
        }

        const index:number = toDoAry.findIndex(x => x.iD === id);
        toDoAry.splice(index, 1);
        localStorage.setItem('todoary', (JSON.stringify(toDoAry)));
        idGenerator.freeID(id);
    }

    const deleteDone = ( id:number ) => {
        const index:number = doneAry.findIndex(x => x.iD === id);
        doneAry.splice(index, 1);
        localStorage.setItem('doneary', (JSON.stringify(doneAry)));
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

    const revertDone = (id:number) => {
        const index:number = doneAry.findIndex(x => x.iD === id);
        const undoneToDo = doneAry.splice(index, 1);
        undoneToDo[0].markAsDone();
        localStorage.setItem('doneary', (JSON.stringify(doneAry)));
        toDoAry.push(undoneToDo[0]);
        localStorage.setItem('todoary', (JSON.stringify(toDoAry)));
    }

    const findDoneToDo = (id:number) => {
        return doneAry.find(x => x.iD === id);
    }

    const createProject = (name:string, toDos:ToDoInterface[], date: Date, priority: string) => {
        const iD = idGenerator.generateID();
        const newProject:ProjectInterface = projectobject(iD, name, toDos, date, priority);
        projectAry.push(newProject);
        updateProjectAry();
        return newProject;
    }

    const modifyProject = (id:number, newName: string | null = null, newToDos:ToDoInterface[] | null = null, newDate: Date | null = null, newPriority: string | null = null) => {
        const project:ProjectInterface = projectAry.find(x => x.iD === id) as ProjectInterface;
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
        updateProjectAry();
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

    const addProjectToDo = (projectiD:number, toDoiD:number) => {
        const project:ProjectInterface = projectAry.find(x => x.iD === projectiD) as ProjectInterface;
        const toDo:ToDoInterface = toDoAry.find(x => x.iD === toDoiD) as ToDoInterface;
        project.addToDo(toDo);
        updateProjectAry();
    }

    const deleteItem = (id:number) => {
        if (toDoAry.find(x => x.iD === id)) {
            deleteToDo(id);
        } else if (doneAry.find(x => x.iD === id)) {
            deleteDone(id);
        } else if (projectAry.find(x => x.iD === id)) {
            deleteProject(id);
        }
    }

    const getToDoAry = () => toDoAry;
    const getDoneAry = () => doneAry;
    const getProjectAry = () => projectAry;
    const updateProjectAry = () => {
        localStorage.setItem('projectary', (JSON.stringify(projectAry)));
    }
    const clearProjectTodos = (projectiD:number) => {
        const project:ProjectInterface = projectAry.find(x => x.iD === projectiD) as ProjectInterface;
        project.setToDos([]);
    }

    return {
        createToDo,
        modifyToDo,
        modifyDone,
        deleteToDo,
        getToDoAry,
        loadArys,
        getDoneAry,
        moveToDone,
        revertDone,
        findTodDo,
        findDoneToDo,
        createProject,
        modifyProject,
        getProjectAry,
        deleteProject,
        findProject,
        updateProjectAry,
        deleteItem,
        clearProjectTodos,
        addProjectToDo
    }
})();

export default toDoManipulator;