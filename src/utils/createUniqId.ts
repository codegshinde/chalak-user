import { User } from "../models/User";

export interface CreateUniqId {
  (firstName: string, lastName: string): Promise<string>;
}

export async function createUniqId(firstName: string, lastName: string): Promise<string> {
  const randomNumber = Math.floor(Math.random() * 9000) + 1000;
  const firstLetter = firstName.charAt(0).toUpperCase();
  const lastLetter = lastName.charAt(0).toUpperCase();
  const userId = `${firstLetter}${lastLetter}${randomNumber}`;

  // Check if generated ID already exists in database
  const existingUser = await User.findOne({ userId });

  // If ID exists, generate a new one recursively until a unique ID is found.
  if (existingUser) {
    return await createUniqId(firstName, lastName);
  }

  return userId;
}
