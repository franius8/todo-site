const toDo = (heading: string, text: string, date: Date, priority: string, id:number, projectiDs:number[], done = false) => {
  const iD:number = id;
  let doneStatus = done;
  const markAsDone = () => doneStatus = !doneStatus;
  const getDoneStatus = () => doneStatus;
  return { heading, text, date, priority, iD, projectiDs, markAsDone, getDoneStatus };
};

export default toDo;