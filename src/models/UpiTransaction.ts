import { Schema, model } from "mongoose";

interface UpiTransactionTypes {
  amount: number;
  uniqId: string;
  orderId: string;
  userId: string;
  status: "pending" | "success" | "failed";
}

const UpiTransactionSchema = new Schema<UpiTransactionTypes>({
  amount: { type: Number, required: true },
  uniqId: { type: String, required: true },
  orderId: { type: String, required: true },
  userId: { type: String, required: true },
  status: { type: String, required: true, default: "pending" },
});

const UpiTransaction = model<UpiTransactionTypes>("upitransactions", UpiTransactionSchema);

export { UpiTransaction, UpiTransactionTypes };

