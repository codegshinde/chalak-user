import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { UserToken } from "../../global";
import { Subscription } from "../../models/Subscription";

/**
 * Handles the request to create a new pocket.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} A promise that resolves once the handler is complete.
 */
async function getSubscriptionsHandler(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { id } = request.user as UserToken;
  try {
    // Check if pocket already exists for the user
    const subscriptions = await Subscription.findOne({
      userId: id,
      endDate: { $gte: new Date() },
    });

    if (!subscriptions) {
      throw new Error("Subscription is not active");
    }

    reply.send({
      subscriptions: subscriptions,
    });
  } catch (error) {
    throw error;
  }
}

/**
 * Options for the create pocket route.
 * Combines the route schema with the handler.
 * @type {RouteShorthandOptionsWithHandler}
 */
export const getSubscriptionsRouteOptions: RouteShorthandOptionsWithHandler = {
  handler: getSubscriptionsHandler,
};
