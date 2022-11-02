const Project = (iD: number, name:string, toDos:ToDo[], date: Date, priority: string) => {
  return { iD, name, date, priority, toDos };
}

export default Project;