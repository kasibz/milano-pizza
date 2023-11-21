import getWeek from "./getWeek";

function groupByWeek(data) {
    // Create a map to store grouped data
    const groupedData = new Map();
  
    // Iterate through each object
    data.forEach(obj => {
      // Get the week of the year
      const week = getWeek(new Date(obj.orderDate));
  
      // If the week is not already a key in the map, create an array for it
      if (!groupedData.has(week)) {
        groupedData.set(week, []);
      }
  
      // Add the object to the corresponding week
      groupedData.get(week).push(obj);
    });
  
    return groupedData;
  }

  export default groupByWeek