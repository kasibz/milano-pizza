function getWeekDates(date) {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // Start of the week (Sunday)
    const endOfWeek = new Date(date);
    endOfWeek.setDate(date.getDate() - date.getDay() + 6); // End of the week (Saturday)
    const year = date.getFullYear();
    return { startOfWeek, endOfWeek, year };
  }

  export default getWeekDates