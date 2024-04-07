"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createUserTransctionRouteOptions", {
    enumerable: true,
    get: function() {
        return createUserTransctionRouteOptions;
    }
});
const _Pocket = require("../../models/Pocket");
const _Transaction = require("../../models/Transaction");
const _createTransactionSchema = require("../schema/createTransactionSchema");
/**
 * Handles the request to create a new transaction for a user.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} A promise that resolves once the handler is complete.
 */ const createUserTransctionHandler = async (request, reply)=>{
    try {
        const { id } = request.user;
        const body = request.body;
        // Check if a transaction with the same orderId already exists
        const existingTransaction = await _Transaction.Transaction.findOne({
            orderId: body.orderId
        });
        if (existingTransaction) {
            throw new Error(`${body.orderId} OrderId is already stored. Duplicate orders are not allowed.`);
        }
        // Find the user's pocket
        const pocket = await _Pocket.Pocket.findOne({
            userId: id
        });
        if (!pocket) {
            throw new Error("User Pocket is not created!");
        }
        // Determine transaction type (debit or credit) based on the presence of a serviceId
        const transactionType = body.serviceId ? "debit" : "credit";
        let status = "pending";
        // Check if the user has sufficient balance for debit transactions
        if (transactionType === "debit" && pocket.balance < 200 + body.amount) {
            status = "failed";
        }
        // Create a new transaction document
        const newTransaction = new _Transaction.Transaction({
            ...body,
            type: transactionType,
            userId: id,
            status
        });
        // Save the new transaction
        await newTransaction.save();
        // Send response with details of the new transaction
        reply.send({
            orderDetails: newTransaction
        });
    } catch (error) {
        // Propagate any caught errors
        throw error;
    }
};
const createUserTransctionRouteOptions = {
    schema: _createTransactionSchema.createTransactionRouteSchema,
    handler: createUserTransctionHandler
};
