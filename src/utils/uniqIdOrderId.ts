import { UpiTransaction } from "../models/UpiTransaction";

export async function uniqOrderId(): Promise<string> {
  const orderId = await generateRandom16DigitNumber();

  // Check if generated ID already exists in database
  const existingOrderId = await UpiTransaction.findOne({ orderId });

  // If ID exists, generate a new one recursively until a unique ID is found.
  if (existingOrderId) {
    return await uniqOrderId();
  }

  return orderId;
}

/**
 * Generates a random 16-digit integer.
 * @returns {string} A random 16-digit integer as a string.
 */
async function generateRandom16DigitNumber(): Promise<string> {
  let result = "";
  for (let i = 0; i < 16; i++) {
    // For the first digit, ensure it's not 0 to prevent leading zeros
    if (i === 0) {
      result += Math.floor(Math.random() * 9) + 1;
    } else {
      result += Math.floor(Math.random() * 10);
    }
  }
  return result;
}
