import { FastifyInstance, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { UserToken } from "../global";
import { Subscription } from "../models/Subscription";

/**
 * Plugin for authentication middleware.
 * Adds a preHandler hook to verify JWT tokens for protected routes.
 *
 * @param fastify - The FastifyInstance to register the plugin.
 */
async function recharge(fastify: FastifyInstance): Promise<void> {
  // Define public routes that do not require authentication
  const publicRoutes = ["/subscriptions"];
  // Add preHandler hook to verify JWT for protected routes
  fastify.addHook("preHandler", async (request: FastifyRequest) => {
    try {
      const user = request.user as UserToken;
      // Skip authentication for public routes
      if (publicRoutes.includes(request.routeOptions.url)) {
        return;
      }

      const subscriptionCheck = await Subscription.findOne({
        userId: user.id,
        endDate: { $gte: new Date() },
      });

      // Throw an error if auth headers are not provided
      if (!subscriptionCheck) {
        throw new Error("Subscription is not active");
      }
    } catch (error) {
      // Throw an error if JWT verification fails
      throw error;
    }
  });
}

// Export the plugin as a Fastify plugin
export default fp(recharge);
