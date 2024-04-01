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
 * Handles the request to retrieve transactions for a user with pagination.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} A promise that resolves once the handler is complete.
 */ const getTransactionHandler = async (request, reply)=>{
    try {
        // Extract the user ID from the request token
        const { id } = request.user;
        // Get pagination parameters from query params
        const { page = "1", limit = "10" } = request.query;
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const skipCount = (pageNumber - 1) * limitNumber;
        // Find transactions associated with the user ID with pagination
        const transactions = await _Transaction.Transaction.find({
            userId: id
        }).skip(skipCount).limit(limitNumber);
        // Count the total number of transactions for the user
        const totalCount = await _Transaction.Transaction.countDocuments({
            userId: id
        });
        const totalPages = Math.ceil(totalCount / limitNumber);
        // If no transactions are found, throw an error
        if (!transactions || transactions.length === 0) {
            throw new Error("Transactions not found for this user.");
        }
        // Send the found transactions and pagination data in the response
        reply.send({
            transactions,
            pagination: {
                currentPage: pageNumber,
                totalPages,
                totalCount
            }
        });
    } catch (error) {
        // Propagate any caught errors
        throw error;
    }
};
const getUserTransactionRouteOptions = {
    schema: {},
    // Add schema if necessary
    handler: getTransactionHandler
};
