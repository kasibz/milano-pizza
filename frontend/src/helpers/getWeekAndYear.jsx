import getWeek from "./getWeek";

function getWeekAndYear(date) {
    const week = getWeek(date);
    const year = date.getFullYear();
    return { week, year };
  }

  export default getWeekAndYear