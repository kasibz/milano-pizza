
import getWeekDates from "./getWeekDates";

function groupByWeek(data) {
  // Create a map to store grouped data
  const groupedData = new Map();

  // Iterate through each object
  data.forEach(obj => {
    // Get the week and year
    const { startOfWeek, endOfWeek, year  } = getWeekDates(new Date(obj.customerOrderDate));

    // Create a string representation of the date range including the year
    const dateRange = `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;

    // If the year is not already a key in the map, create an object for it
    if (!groupedData.has(year)) {
      groupedData.set(year, {});
    }

    // If the week is not already a key in the inner object, create an array for it
    if (!groupedData.get(year)[dateRange]) {
      groupedData.get(year)[dateRange] = [];
    }

    // Add the object to the corresponding week and year
    groupedData.get(year)[dateRange].push(obj);
  });

  return groupedData;
}

  export default groupByWeek