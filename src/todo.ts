const toDo = (heading: string, text: string, date: Date, priority: string) => {
  let done = false
  const markAsDone = () => done = true;
  const getDoneStatus = () => done;
  return { heading, text, date, priority, markAsDone, getDoneStatus };
};

export default toDo;