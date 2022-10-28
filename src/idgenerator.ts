const idGenerator = (() => {
  const iDsAry:number[] = []
  const generateID = () => {
    while (true) {
      let randID:number = Math.floor(Math.random() * (10000));
      if (!iDsAry.includes(randID)) {
        iDsAry.push(randID);
        return randID
      }
    }
  }
  return { generateID }
})();

export default idGenerator;
