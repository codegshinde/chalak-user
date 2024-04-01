import { Schema, model } from "mongoose";

interface PocketTypes {
  userId: Schema.Types.ObjectId;
  balance: number;
}

const pocketSchema = new Schema<PocketTypes>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    balance: { type: Number, required: false, default: 0 },
  },
  { timestamps: true }
);

const Pocket = model<PocketTypes>("pockets", pocketSchema);

export { Pocket, PocketTypes };

