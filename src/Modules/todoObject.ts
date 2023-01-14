const todoobject = (heading: string, text: string, date: string, priority: string, iD:number, projectiDs:number[], done = false) => {
    return { heading, text, date, priority, iD, projectiDs};
};

export default todoobject;
