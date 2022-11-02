const toDo = (heading: string, text: string, date: Date, priority: string, id:number, projectiDs:number[]) => {
  const iD:number = id;
  let done = false;
  const markAsDone = () => done = !done;
  const getDoneStatus = () => done;
  return { heading, text, date, priority, iD, projectiDs, markAsDone, getDoneStatus };
};

export default toDo;