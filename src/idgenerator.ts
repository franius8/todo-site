const idGenerator = (() => {
  const iDsAry:number[] = JSON.parse(localStorage.getItem("idsary") || "[]");
  const generateID = () => {
    while (true) {
      let randID:number = Math.floor(Math.random() * (10000));
      if (!iDsAry.includes(randID)) {
        iDsAry.push(randID);
        localStorage.setItem('idsary', (JSON.stringify(iDsAry)));
        return randID;
      }
    }
  }
  const freeID = (id:number) => {
    const index = iDsAry.indexOf(id);
    iDsAry.splice(index, 1);
    localStorage.setItem('idsary', (JSON.stringify(iDsAry)));
  }
  return { generateID, freeID }
})();

export default idGenerator;
