interface ToDo {
  heading: string;
  text: string;
  date: any;
  priority: string;
  iD: number;
  projectiDs: number[];
  markAsDone: () => void;
  getDoneStatus: () => boolean;
}

interface Project {
  name: string;
  date: any;
  priority: string;
  iD: number;
  toDos: ToDo[];
  addToDo: (toDo:ToDo) => void;
  clearToDos: () => void;
  getToDos: () => ToDo[];
  setToDos: (toDos:ToDo[]) => void;
}

interface RawProject {
  name: string;
  date: any;
  priority: string;
  iD: number;
  toDos: ToDo[];
}

interface generalObject {
  [key: string]: unknown;
}