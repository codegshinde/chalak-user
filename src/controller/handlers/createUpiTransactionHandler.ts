import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { UserToken } from "../../global";
import { UpiTransaction } from "../../models/UpiTransaction";
import { uniqOrderId } from "../../utils/uniqIdOrderId";
import { UpiTransactionRouteBody, createUpiTransactionRouteSchema } from "../schema/createUpiTransactionRouteSchema";

const createUpiTransactionHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { uniqId, amount } = request.body as UpiTransactionRouteBody;
    const { id } = request.user as UserToken;

    const checkExitingUpiTransaction = await UpiTransaction.findOne({ uniqId, status: "pending" });
    if (checkExitingUpiTransaction) {
      throw new Error("Sorry Try Again!");
    }

    // genrate orderId
    const orderId = await uniqOrderId();

    const newUpiTransaction = new UpiTransaction({
      orderId,
      uniqId,
      amount,
      userId: id,
    });

    await newUpiTransaction.save();

    reply.send({
      paymentDetails: newUpiTransaction,
    });
  } catch (error) {
    throw error;
  }
};

export const createUpiTransactionRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: createUpiTransactionRouteSchema,
  handler: createUpiTransactionHandler,
};
