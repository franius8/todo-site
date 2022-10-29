const dateConverter = (() => {
  const convertToString = (date: Date) => {
    let result = '';
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  result = day + '.' + month + '.' + year;
  return result;
  }
  const convertToInputFormat = (date: Date) => {
    let result = '';
    let day = String(date.getDate()).padStart(2, '0');
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    result = year + '-' + month + '-' + day;
    return result;
  }

  const getDayDifference = (date: Date) => {
    const toDoDate = date;
    const currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const timeDifference = toDoDate.getTime() - currentDate.getTime();
    const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    return dayDifference;
  }
  return { convertToString, getDayDifference, convertToInputFormat };
})();

export default dateConverter;
