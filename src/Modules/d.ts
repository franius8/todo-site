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

export type { ToDoInterface, ProjectInterface };