const toDo = (heading: string, text: string, date: Date, priority: string, id:number, projectiDs:number[], done = false) => {
  let doneStatus = done;
  const markAsDone = () => doneStatus = !doneStatus;
  const getDoneStatus = () => doneStatus;
  return { heading:heading, text:text, date:date, priority:priority, iD:id, projectiDs:projectiDs, markAsDone, getDoneStatus };
};

export default toDo;