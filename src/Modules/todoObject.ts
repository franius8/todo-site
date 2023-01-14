const todoobject = (heading: string, text: string, date: string, priority: string, id:number, projectiDs:number[], done = false) => {
    return { heading:heading, text:text, date:date, priority:priority, iD:id, projectiDs:projectiDs};
};

export default todoobject;
