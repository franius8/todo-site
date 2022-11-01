interface ToDo {
  heading: string;
  text: string;
  date: any;
  priority: string;
  iD: number;
  markAsDone: Function;
  getDoneStatus: Function;
}

interface Project {
  name: string;
  toDos: ToDo[];
  date: Date;
  priority: String;
  iD: number;
  getToDos: Function;
}