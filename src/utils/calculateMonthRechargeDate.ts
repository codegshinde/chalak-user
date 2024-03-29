export async function calculateEndDateFromStartDate(startDate: Date, duration: "1M" | "3M" | "6M" | "1Y") {
  // Create a new date object from the start date string
  const startDateObj = new Date(startDate);

  // Calculate the end date based on the duration
  let endDateObj;
  switch (duration) {
    case "1M": // 1 month
      endDateObj = new Date(startDateObj.getFullYear(), startDateObj.getMonth() + 1, startDateObj.getDate());
      break;
    case "3M": // 3 months
      endDateObj = new Date(startDateObj.getFullYear(), startDateObj.getMonth() + 3, startDateObj.getDate());
      break;
    case "6M": // 6 months
      endDateObj = new Date(startDateObj.getFullYear(), startDateObj.getMonth() + 6, startDateObj.getDate());
      break;
    case "1Y": // 1 year
      endDateObj = new Date(startDateObj.getFullYear() + 1, startDateObj.getMonth(), startDateObj.getDate());
      break;
    default:
      throw new Error("Invalid duration provided.");
  }

  // Return the end date as a Date object
  return endDateObj;
}
