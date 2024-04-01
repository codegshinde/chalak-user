import { Schema, model } from "mongoose";

interface TransactionTypes {
  userId: Schema.Types.ObjectId;
  orderId: string;
  status: "pending" | "success" | "failed";
  serviceId?: string;
  amount: number;
  mode?: string;
  vleId?: string;
  type: "debit" | "credit";
  portalFee: number;
}

const transactionsSchema = new Schema<TransactionTypes>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    orderId: { type: String, required: true },
    serviceId: { type: String },
    amount: { type: Number, required: true },
    status: { type: String, required: true, default: "pending" },
    type: { type: String, required: true },
    mode: { type: String },
    portalFee: { type: Number, required: true, default: 5 },
  },
  { timestamps: true }
);

const Transaction = model<TransactionTypes>("Transaction", transactionsSchema);

export { Transaction, TransactionTypes };

