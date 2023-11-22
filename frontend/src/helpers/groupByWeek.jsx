
import getWeekAndYear from "./getWeekAndYear";

function groupByWeek(data) {
  // Create a map to store grouped data
  const groupedData = new Map();

  // Iterate through each object
  data.forEach(obj => {
    // Get the week and year
    const { week, year } = getWeekAndYear(new Date(obj.customerOrderDate));

    // If the year is not already a key in the map, create an object for it
    if (!groupedData.has(year)) {
      groupedData.set(year, {});
    }

    // If the week is not already a key in the inner object, create an array for it
    if (!groupedData.get(year)[week]) {
      groupedData.get(year)[week] = [];
    }

    // Add the object to the corresponding week and year
    groupedData.get(year)[week].push(obj);
  });

  return groupedData;
}

  export default groupByWeek