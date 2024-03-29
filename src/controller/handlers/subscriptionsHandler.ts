import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { UserToken } from "../../global";
import { Subscription } from "../../models/Subscription";
import { calculateEndDateFromStartDate } from "../../utils/calculateMonthRechargeDate";
import { subscriptionsRouteSchema } from "../schema/subscriptionsSchema";

/**
 * Handles the request to create a new pocket.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} A promise that resolves once the handler is complete.
 */
async function subscriptionsHandler(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const authenticatedUser = request.user as UserToken;
  const body = request.body as { plan: string; duration: "1M" | "3M" | "6M" | "1Y" };
  try {
    // Check if pocket already exists for the user
    const existingSubscriptions = await Subscription.findOne({
      userId: authenticatedUser.id,
      endDate: { $gte: new Date() },
    });

    if (existingSubscriptions) {
      throw new Error("User already has an active subscription");
    }

    const endDate = await calculateEndDateFromStartDate(new Date(), body.duration);
    // Create a new pocket document
    const newSubscriptions = new Subscription({
      userId: authenticatedUser.id,
      plan: body.plan,
      endDate: endDate,
    });

    // Save the pocket
    const savedSubscriptions = await newSubscriptions.save();

    reply.send({
      pocketDetails: savedSubscriptions,
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
export const subscriptionsRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: subscriptionsRouteSchema,
  handler: subscriptionsHandler,
};
