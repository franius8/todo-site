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
  toDos:ToDo[]
  priority: string;
  iD: number;
}