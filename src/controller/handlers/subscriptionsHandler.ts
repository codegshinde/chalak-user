import { FastifyReply, FastifyRequest, RouteShorthandOptionsWithHandler } from "fastify";
import { UserToken } from "../../global";
import { Subscription } from "../../models/Subscription";
import { calculateEndDateFromStartDate } from "../../utils/calculateMonthRechargeDate";
import { subscriptionsRouteSchema } from "../schema/subscriptionsSchema";

/**
 * Handles the request to create a new subscription.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<void>} A promise that resolves once the handler is complete.
 */
interface SubscriptionTypes {
  plan: string;
  duration: "1M" | "3M" | "6M" | "1Y";
}
async function subscriptionsHandler(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const { id } = request.user as UserToken;
  const body = request.body as SubscriptionTypes;
  try {
    // Check if user already has an active subscription
    const existingSubscription = await Subscription.findOne({
      userId: id,
      endDate: { $gte: new Date() },
    });

    if (existingSubscription) {
      throw new Error("User already has an active subscription.");
    }

    // Calculate the end date of the subscription based on the start date and duration
    const endDate = await calculateEndDateFromStartDate(new Date(), body.duration);

    // Create a new subscription document
    const newSubscription = new Subscription({
      userId: id,
      plan: body.plan,
      endDate: endDate,
    });

    // Save the new subscription
    await newSubscription.save();

    // Send the response with subscription details
    reply.send({
      subscriptionDetails: newSubscription,
    });
  } catch (error) {
    // Forward any caught errors to Fastify for handling
    throw error;
  }
}

/**
 * Options for the subscriptions route.
 * Combines the route schema with the handler.
 * @type {RouteShorthandOptionsWithHandler}
 */
export const subscriptionsRouteOptions: RouteShorthandOptionsWithHandler = {
  schema: subscriptionsRouteSchema,
  handler: subscriptionsHandler,
};
