"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "calculateEndDateFromStartDate", {
    enumerable: true,
    get: function() {
        return calculateEndDateFromStartDate;
    }
});
async function calculateEndDateFromStartDate(startDate, duration) {
    // Create a new date object from the start date string
    const startDateObj = new Date(startDate);
    // Calculate the end date based on the duration
    let endDateObj;
    switch(duration){
        case "1M":
            endDateObj = new Date(startDateObj.getFullYear(), startDateObj.getMonth() + 1, startDateObj.getDate());
            break;
        case "3M":
            endDateObj = new Date(startDateObj.getFullYear(), startDateObj.getMonth() + 3, startDateObj.getDate());
            break;
        case "6M":
            endDateObj = new Date(startDateObj.getFullYear(), startDateObj.getMonth() + 6, startDateObj.getDate());
            break;
        case "1Y":
            endDateObj = new Date(startDateObj.getFullYear() + 1, startDateObj.getMonth(), startDateObj.getDate());
            break;
        default:
            throw new Error("Invalid duration provided.");
    }
    // Return the end date as a Date object
    return endDateObj;
}
