import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { UserToken } from "../../global";
import { Transaction } from "../../models/Transaction";

/**
 * Handles the request to retrieve transactions for a user.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} A promise that resolves once the handler is complete.
 */
const getTransactionHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    // Extract the user ID from the request token
    const { id } = request.user as UserToken;

    // Find transactions associated with the user ID
    const transactions = await Transaction.find({ userId: id });

    // If no transactions are found, throw an error
    if (!transactions || transactions.length === 0) {
      throw new Error("Transactions not found for this user.");
    }

    // Send the found transactions in the response
    reply.send({
      transactions: transactions,
    });
  } catch (error) {
    // Propagate any caught errors
    throw error;
  }
};

/**
 * Options for the get user transactions route.
 * Combines the route schema with the handler.
 * @type {RouteShorthandOptionsWithHandler}
 */
export const getUserTransactionRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: {}, // Add schema if necessary
  handler: getTransactionHandler,
};
