"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getUserTransactionRouteOptions", {
    enumerable: true,
    get: function() {
        return getUserTransactionRouteOptions;
    }
});
const _Transaction = require("../../models/Transaction");
/**
 * Handles the request to retrieve transactions for a user.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} A promise that resolves once the handler is complete.
 */ const getTransactionHandler = async (request, reply)=>{
    try {
        // Extract the user ID from the request token
        const { id } = request.user;
        // Find transactions associated with the user ID
        const transactions = await _Transaction.Transaction.find({
            userId: id
        });
        // If no transactions are found, throw an error
        if (!transactions || transactions.length === 0) {
            throw new Error("Transactions not found for this user.");
        }
        // Send the found transactions in the response
        reply.send({
            transactions: transactions
        });
    } catch (error) {
        // Propagate any caught errors
        throw error;
    }
};
const getUserTransactionRouteOptions = {
    schema: {},
    handler: getTransactionHandler
};
