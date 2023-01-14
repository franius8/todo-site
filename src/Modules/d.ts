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

interface StateInterface {
    content: {
        toDos: ToDoInterface[];
        projectList: ProjectInterface[];
        doneList: ToDoInterface[];
        doneProjectList: ProjectInterface[];
    }
    modal: {
        modalVisible: boolean,
        toDoFormVisible: boolean,
        projectFormVisible: boolean,
        projectToDoFormVisible: boolean,
        modalText: string,
        contentClass: string
    }
}

export type { ToDoInterface, ProjectInterface, StateInterface };