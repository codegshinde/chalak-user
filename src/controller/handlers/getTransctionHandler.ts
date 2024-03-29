import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { UserToken } from "../../global";
import { Transaction } from "../../models/Transaction";

const getTransctionHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { userId } = request.user as UserToken;
    const transactions = await request.getDocument(Transaction, { userId });
    if (!transactions) {
      throw new Error("Transaction not found!");
    }
    reply.send({
      transactions: transactions,
    });
  } catch (error) {
    throw error;
  }
};

export const getUserTranscationRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: {},
  handler: getTransctionHandler,
};
