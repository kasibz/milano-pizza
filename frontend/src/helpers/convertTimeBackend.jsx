function convertTimeBackend(dateString) {
    // Parse the date string using JavaScript Date object
const parsedDate = new Date(dateString);

// Convert the parsed date to an ISO 8601 formatted string
const isoDateString = parsedDate.toISOString();
return isoDateString
}

export default convertTimeBackend