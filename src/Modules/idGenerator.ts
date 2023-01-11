const idGenerator = (() => {
    JSON.parse(localStorage.getItem("idsary") || "[]");
    const generateID = () => {
        return new Date().getTime();
    }
    return { generateID };
})();

export default idGenerator;