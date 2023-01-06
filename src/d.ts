interface ToDoInterface {
    heading: string;
    text: string;
    date: any;
    priority: string;
    iD: number;
    projectiDs: number[];
    markAsDone: () => void;
    getDoneStatus: () => boolean;
}

interface ProjectInterface {
    name: string;
    date: any;
    priority: string;
    iD: number;
    toDosAry: ToDoInterface[];
    addToDo: (toDo:ToDoInterface) => void;
    clearToDos: () => void;
    getToDos: () => ToDoInterface[];
    setToDos: (toDos:ToDoInterface[]) => void;
}

interface RawProject {
    name: string;
    date: any;
    priority: string;
    iD: number;
    toDosAry: ToDoInterface[];
}

interface generalObject {
    [key: string]: unknown;
}

export type { ToDoInterface, ProjectInterface, RawProject, generalObject };