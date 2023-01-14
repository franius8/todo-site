// Module for converting between date formats
const dateConverter = (() => {
    // Function for conerting to display format string
    const convertToString = (date: Date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return day + '.' + month + '.' + year;
    }
    // Function for converting to form input date format
    const convertToInputFormat = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return year + '-' + month.toString().padStart(2, "0") + '-' + day;
    }

    // Function for getting difference between two dates in days
    const getDayDifference = (date: Date) => {
        const toDoDate = date;
        const currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        const timeDifference = toDoDate.getTime() - currentDate.getTime();
        return Math.floor(timeDifference / (1000 * 3600 * 24));
    }
    return { convertToString, getDayDifference, convertToInputFormat };
})();

export default dateConverter;