const toDo = (heading: string, text: string, date: Date, priority: string, id:number) => {
  const iD:number = id;
  let done:Boolean = false;
  const markAsDone = () => done = !done;
  const getDoneStatus = () => done;
  return { heading, text, date, priority, iD, markAsDone, getDoneStatus };
};

export default toDo;