import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";

async function upiUpdatePaymentHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const body = request.body;
    console.log(body);
  } catch (error) {
    throw error;
  }
}

export const upiUpdatePaymentRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: {},
  handler: upiUpdatePaymentHandler,
};
