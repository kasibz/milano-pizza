
function convertToHumanTime(dateString) {
    const dateTime = new Date(dateString);

    // Convert to a readable string using toLocaleString
    const readableDateTime = dateTime.toLocaleString('en-US');

    return readableDateTime;
}

export default convertToHumanTime