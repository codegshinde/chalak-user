import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { UserToken } from "../../global";
import { Pocket } from "../../models/Pocket";
import { Vle } from "../../models/Vle";
import { vleTransactionPasswordRouteBody, vleTransactionPasswordRouteSchema } from "../schema/vleTransactionPasswordSchema";

async function vleTransactionPasswordHandler(request: FastifyRequest, response: FastifyReply) {
  try {
    const { id } = request.user as UserToken;
    const { transactionAmount, vleId } = request.body as vleTransactionPasswordRouteBody;

    const pocket = await Pocket.findOne({ userId: id });

    if (!pocket) {
      throw new Error("Invalid Pocket. Please Create Pocket!");
    }

    const minimumBalance = 200;
    const requiredBalance = minimumBalance + transactionAmount;

    if (pocket.balance < requiredBalance) {
      const shortfall = requiredBalance - pocket.balance;
      throw new Error(`Insufficient balance, you need at least ${requiredBalance}. Please add ${shortfall} to your wallet.`);
    }

    const vle = await Vle.findOne({ _id: vleId });

    if (!vle) {
      throw new Error("Something went wrong please try again!");
    }

    const password = btoa(vle.password);

    response.send({
      password: password,
    });
  } catch (error) {
    throw error;
  }
}

export const vleTransactionPasswordRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: vleTransactionPasswordRouteSchema,
  handler: vleTransactionPasswordHandler,
};
