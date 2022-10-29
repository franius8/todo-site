const dateFixer = (() => {
  const fixDates = (dateString: string) => {
    return new Date (dateString);
  }
  return { fixDates };
})();

export default dateFixer;