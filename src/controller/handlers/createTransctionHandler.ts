import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { UserToken } from "../../global";
import { Pocket } from "../../models/Pocket";
import { Transaction } from "../../models/Transaction";
import { TransactionRouteBody, createTransactionRouteSchema } from "../schema/createTransactionSchema";

/**
 * Handles the request to create a new transaction for a user.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} A promise that resolves once the handler is complete.
 */
const createUserTransctionHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const { id } = request.user as UserToken;
    const body = request.body as TransactionRouteBody;

    // Check if a transaction with the same orderId already exists
    const existingTransaction = await Transaction.findOne({ orderId: body.orderId });
    if (existingTransaction) {
      throw new Error(`${body.orderId} OrderId is already stored. Duplicate orders are not allowed.`);
    }

    // Find the user's pocket
    const pocket = await Pocket.findOne({ userId: id });
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
    const newTransaction = new Transaction({
      ...body,
      type: transactionType,
      userId: id,
      status,
    });

    // Save the new transaction
    await newTransaction.save();

    // Send response with details of the new transaction
    reply.send({ orderDetails: newTransaction });
  } catch (error) {
    // Propagate any caught errors
    throw error;
  }
};

/**
 * Options for the create transaction route.
 * Combines the route schema with the handler.
 * @type {RouteShorthandOptionsWithHandler}
 */
export const createUserTransctionRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: createTransactionRouteSchema,
  handler: createUserTransctionHandler,
};
