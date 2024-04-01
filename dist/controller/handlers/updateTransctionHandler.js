"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateTransactionRouteOptions", {
    enumerable: true,
    get: function() {
        return updateTransactionRouteOptions;
    }
});
const _Pocket = require("../../models/Pocket");
const _Transaction = require("../../models/Transaction");
const _updateTransactionSchema = require("../schema/updateTransactionSchema");
async function updateTransactionHandler(request, response) {
    const { status, orderId } = request.body;
    try {
        // Check if a transaction with the provided order ID already exists
        const existingTransaction = await _Transaction.Transaction.findOne({
            orderId,
            status: {
                $in: [
                    "success",
                    "failed"
                ]
            }
        });
        // If a transaction with the same order ID already exists, return an error response
        if (existingTransaction) {
            throw new Error("Transaction with the provided order ID already exists.");
        }
        // Update transaction status based on the provided status
        if (status === "failed" || status === "success") {
            const updatedTransaction = await _Transaction.Transaction.findOneAndUpdate({
                orderId
            }, {
                status
            }, {
                new: true
            });
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
                    orderDetails: updatedTransaction
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
 */ async function updateWalletBalance(amount, userId, type) {
    try {
        // Round the amount to two decimal places
        const roundedAmount = Math.round(amount * 100) / 100;
        // Determine the update query based on the transaction type
        const updateQuery = type === "debit" ? {
            $inc: {
                balance: -roundedAmount
            }
        } : {
            $inc: {
                balance: roundedAmount
            }
        };
        // Update the pocket document with the new balance
        const updatedPocket = await _Pocket.Pocket.findOneAndUpdate({
            userId
        }, updateQuery, {
            new: true
        });
        return updatedPocket;
    } catch (error) {
        throw new Error("Error updating wallet balance");
    }
}
const updateTransactionRouteOptions = {
    schema: _updateTransactionSchema.updateTransactionRouteSchema,
    handler: updateTransactionHandler
};
