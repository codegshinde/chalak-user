import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { Schema } from "mongoose";
import { Pocket, PocketTypes } from "../../models/Pocket";
import { Transaction } from "../../models/Transaction";
import { updateTransactionRouteSchema } from "../schema/updateTransactionSchema";

/**
 * Handles the request to update a transaction status.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} response - The Fastify reply object.
 * @returns {Promise<void>} A promise that resolves once the handler is complete.
 */
interface TransactionTypes {
  orderId: string;
  status: "pending" | "success" | "failed";
}
async function updateTransactionHandler(request: FastifyRequest, response: FastifyReply): Promise<void> {
  const { status, orderId } = request.body as TransactionTypes;
  try {
    // Check if a transaction with the provided order ID already exists
    const existingTransaction = await Transaction.findOne({
      orderId,
      status: { $in: ["success", "failed"] },
    });

    // If a transaction with the same order ID already exists, return an error response
    if (existingTransaction) {
      throw new Error("Transaction with the provided order ID already exists.");
    }

    // Update transaction status based on the provided status
    if (status === "failed" || status === "success") {
      const updatedTransaction = await Transaction.findOneAndUpdate({ orderId }, { status }, { new: true });

      if (updatedTransaction) {
        // Handle different scenarios based on transaction type
        let message = "";
        if (status === "failed") {
          message = "Payment failed! Please try again.";
        } else if (status === "success") {
          message = updatedTransaction.type === "debit" ? "Application payment done!" : "Balance added successfully!";
          await updateWalletBalance(updatedTransaction.amount, updatedTransaction.userId, updatedTransaction.type);
        }

        response.send({
          message,
          orderDetails: updatedTransaction,
        });
      }
    }
  } catch (error) {
    // Forward any caught errors to Fastify for handling
    throw new Error("Internal Server Error");
  }
}

/**
 * Updates the wallet balance based on the transaction amount and type.
 *
 * @param {number} amount - The transaction amount.
 * @param {Schema.Types.ObjectId} userId - The user ID associated with the transaction.
 * @param {"debit" | "credit"} type - The type of transaction.
 * @returns {Promise<PocketTypes | null>} A promise that resolves with the updated pocket document.
 */
async function updateWalletBalance(
  amount: number,
  userId: Schema.Types.ObjectId,
  type: "debit" | "credit"
): Promise<PocketTypes | null> {
  try {
    // Round the amount to two decimal places
    const roundedAmount = Math.round(amount * 100) / 100;

    // Determine the update query based on the transaction type
    const updateQuery = type === "debit" ? { $inc: { balance: -roundedAmount } } : { $inc: { balance: roundedAmount } };

    // Update the pocket document with the new balance
    const updatedPocket = await Pocket.findOneAndUpdate({ userId }, updateQuery, { new: true });

    return updatedPocket;
  } catch (error) {
    throw new Error("Error updating wallet balance");
  }
}

// Route options for updating transaction status
export const updateTransactionRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: updateTransactionRouteSchema,
  handler: updateTransactionHandler,
};
