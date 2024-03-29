import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { UserToken } from "../../global";
import { Pocket } from "../../models/Pocket";
import { Transaction } from "../../models/Transaction";
import { TransactionRouteBody, createTransactionRouteSchema } from "../schema/createTransactionSchema";

const createUserTransctionHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId } = request.user as UserToken;
  const body = request.body as TransactionRouteBody;
  
  // this is the power of coding
  try {
    const existingTransaction = await request.getDocument(Transaction, { orderId: body.orderId });
    if (existingTransaction) {
      throw new Error(`${body.orderId} OrderId is already stored. Duplicate orders are not allowed.`);
    }

    const pocket = await request.getDocument(Pocket, { userId });
    if (!pocket) {
      throw new Error("User Pocket is not created!");
    }

    const transactionType = body.serviceId ? "debit" : "credit";
    let status = "pending";

    if (transactionType === "debit" && pocket.balance < 100 + body.amount) {
      status = "failed";
    }

    const newTransaction = await request.createDocument(Transaction, {
      ...body,
      type: transactionType,
      userId,
      status,
    });

    reply.send({ orderDetails: newTransaction });
  } catch (error) {
    throw error;
  }
};

export const createUserTransctionRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: createTransactionRouteSchema,
  handler: createUserTransctionHandler,
};
