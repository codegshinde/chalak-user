import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { Schema } from "mongoose";
import { Pocket, PocketTypes } from "../../models/Pocket";
import { Transaction } from "../../models/Transaction";
import { updateTransactionRouteSchema } from "../schema/updateTransactionSchema";

async function updateTransactionHandler(request: FastifyRequest, response: FastifyReply): Promise<void> {
  const { orderId } = request.params as { orderId: string };
  const { status } = request.body as { status: "pending" | "success" | "failed" };

  try {
    // Check if the transaction with the provided order ID already exists
    const existingTransaction = await Transaction.findOne({
      orderId,
      status: { $in: ["success", "failed"] },
    });
    // If a transaction with the same order ID already exists, return an error response
    if (existingTransaction) {
      response.status(400).send({ error: "Transaction with the provided order ID already exists." });
      return;
    }

    if (status === "failed") {
      const updatedTransaction = await Transaction.findOneAndUpdate({ orderId }, { status }, { new: true });

      if (updatedTransaction) {
        response.send({
          message: "Payment failed! Please try again.",
          orderDetails: updatedTransaction,
        });
      }

      return;
    }

    if (status === "success") {
      const updatedTransaction = await Transaction.findOneAndUpdate({ orderId }, { status }, { new: true });

      if (updatedTransaction) {
        let message = "";
        if (updatedTransaction.type === "debit") {
          await updateWalletBalance(updatedTransaction.amount, updatedTransaction.userId, "debit");
          message = "Application payment done!";
        } else if (updatedTransaction.type === "credit") {
          await updateWalletBalance(updatedTransaction.amount, updatedTransaction.userId, "credit");
          message = "Balance added successfully!";
        }

        response.send({
          message,
          orderDetails: updatedTransaction,
        });
      }
    }
  } catch (error) {
    response.status(500).send({ error: "Internal Server Error" });
  }
}

async function updateWalletBalance(
  amount: number,
  userId: Schema.Types.ObjectId,
  type: "debit" | "credit"
): Promise<PocketTypes | null> {
  try {
    // Round the amount to two decimal places
    const roundedAmount = Math.round(amount * 100) / 100;

    let updateQuery: any = {};
    if (type === "debit") {
      // Deduct balance for debit
      updateQuery = { $inc: { balance: -roundedAmount } };
    } else if (type === "credit") {
      // Add balance for credit
      updateQuery = { $inc: { balance: roundedAmount } };
    }

    // Update the pocket document with the new balance
    const updatedPocket = await Pocket.findOneAndUpdate({ pocketId: userId }, updateQuery, { new: true });

    return updatedPocket;
  } catch (error) {
    console.error("Error updating wallet balance:", error);
    return null;
  }
}

export const updateTransactionRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: updateTransactionRouteSchema,
  handler: updateTransactionHandler,
};
