import { Schema } from "mongoose";
import { Pocket, PocketTypes } from "../models/Pocket";

export interface PocketBalance {
  (pocketId: Schema.Types.ObjectId): Promise<PocketTypes>;
}

export const pocketBalance = async (pocketId: Schema.Types.ObjectId): Promise<PocketTypes> => {
  try {
    const pocket = await Pocket.findOne({ pocketId: pocketId });

    if (!pocket) {
      throw new Error("Pocket Not Created, Create it First!");
    }

    return pocket;
  } catch (error) {
    throw error;
  }
};
