import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { UserToken } from "../../global";
import { Transaction } from "../../models/Transaction";

/**
 * Handles the request to retrieve transactions for a user with pagination.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} A promise that resolves once the handler is complete.
 */
const getTransactionHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    // Extract the user ID from the request token
    const { id } = request.user as UserToken;

    // Get pagination parameters from query params
    const { page = "1", limit = "10" } = request.query as { page: string; limit: string };
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skipCount = (pageNumber - 1) * limitNumber;

    // Find transactions associated with the user ID with pagination
    const transactions = await Transaction.find({ userId: id }).skip(skipCount).limit(limitNumber);

    // Count the total number of transactions for the user
    const totalCount = await Transaction.countDocuments({ userId: id });
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
        totalCount,
      },
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
  schema: {},
  // Add schema if necessary
  handler: getTransactionHandler,
};
