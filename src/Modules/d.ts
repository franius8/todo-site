interface ToDoInterface {
    heading: string;
    text: string;
    date: string;
    priority: string;
    iD: number;
    projectiDs: number[];
}

interface ProjectInterface {
    name: string;
    date: string;
    priority: string;
    iD: number;
    toDosAry: ToDoInterface[];
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